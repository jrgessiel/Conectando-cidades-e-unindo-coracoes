import { Utils } from '../utils/utils.js';

export class MascotModule {
    constructor(firebaseService) {
        this.firebase = firebaseService;
        this.state = {
            stats: { hunger: 80, energy: 80, hygiene: 100, humor: 100 },
            status: { currentState: 'idle', busyUntil: 0, lastUpdate: 0 },
            history: []
        };
        this.currentUser = null;
        this.isTogether = false;

        this.completionTimer = null;
        this.buttonUpdateTimer = null;
    }

    init(currentUser) {
        this.currentUser = currentUser;
        this.firebase.onMascotChange((data) => this.handleMascotUpdate(data));
    }

    setIsTogether(value) {
        this.isTogether = value;
    }

    async handleMascotUpdate(data) {
        if (!data) return;

        this.state.stats = data.stats || this.state.stats;
        this.state.status = data.status || this.state.status;
        this.state.history = data.history || [];

        const now = Date.now();
        const lastUpdate = data.status?.lastUpdate || now;

        if (this.currentUser !== 'visitante' && (now - lastUpdate > 180_000)) {
            await this.applyPassiveDecay(data);
            return;
        }

        this.updateDisplay();
    }

    async applyPassiveDecay(data) {
        const now = new Date();
        const lastUpdate = new Date(data.status.lastUpdate);
        const diffInHours = Math.max(0, (now - lastUpdate) / (1000 * 60 * 60));

        let { hunger, energy, hygiene, humor } = { ...data.stats };

        console.log(`[Mascot Decay] Aplicando decaimento (${diffInHours.toFixed(2)} horas)`);

        if (data.status.currentState === 'sleeping') {
            energy = Math.min(100, energy + (25 * diffInHours));
        } else {
            energy = Math.max(0, energy - (5 * diffInHours));
        }

        hygiene = Math.max(0, hygiene - (5 * diffInHours));
        humor = Math.max(0, humor - (5 * diffInHours));

        const mealHours = [10, 13, 16, 20];
        mealHours.forEach(hour => {
            const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0);
            if (lastUpdate < targetTime && now >= targetTime) {
                hunger = Math.max(0, hunger - (hour === 13 || hour === 20 ? 20 : 10));
                console.log(`[Mascot Decay] Queda de fome no horário ${hour}h`);
            }
        });

        await this.firebase.updateMascot({
            stats: { hunger, energy, hygiene, humor },
            status: { ...data.status, lastUpdate: Date.now() }
        });

        console.log(`[Mascot Decay] Novo estado salvo:`, { hunger, energy, hygiene, humor });
    }

    async handleAction(index) {
        if (this.currentUser === 'visitante') return;

        this.clearAllTimers();

        const now = Date.now();
        const status = this.state.status;
        let stats = { ...this.state.stats };

        if (status.busyUntil > now && index !== 3) return;

        let mutation = {};
        let newState = 'idle';
        let duration = 0;
        let actionText = '';

        if (index === 3) {
            const isSleeping = status.currentState === 'sleeping';
            newState = isSleeping ? 'idle' : 'sleeping';
            actionText = isSleeping ? 'acordou ela' : 'colocou a mascote para dormir';
        } else {
            if (status.currentState === 'sleeping') return;

            switch (index) {
                case 0:
                    mutation = { hunger: 30, hygiene: -5, energy: -5, humor: 10 };
                    newState = 'eating'; duration = 30000; actionText = 'alimentou';
                    break;
                case 1:
                    mutation = { humor: 25, hygiene: -10, hunger: -5, energy: -10 };
                    newState = 'playing'; duration = 30000; actionText = 'brincou com ela';
                    break;
                case 2:
                    mutation = { hygiene: 100 - stats.hygiene, energy: 10, humor: 10 };
                    newState = 'bathing'; duration = 30000; actionText = 'deu banho nela';
                    break;
            }

            const modifier = (stats.humor < 30 ? 0.5 : 1) * (this.isTogether ? 2 : 1);
            for (let key in mutation) {
                const value = mutation[key];
                stats[key] = Utils.clamp(stats[key] + (value > 0 ? value * modifier : value));
            }
        }

        const userName = this.currentUser === 'ela' ? 'Heloise' : 'Gessiel';
        const historyEntry = [{ user: userName, text: actionText, timestamp: now }];

        await this.firebase.updateMascot({
            stats,
            status: { currentState: newState, busyUntil: now + duration, lastUpdate: now },
            history: historyEntry
        });

        if (duration > 0 && newState !== 'idle' && newState !== 'sleeping') {
            this.startCompletionTimer(duration);
        }
    }

    startCompletionTimer(duration) {
        this.completionTimer = setTimeout(async () => {
            console.log(`[Mascot] 30s finalizado → resetando para idle`);
            await this.firebase.updateMascot({
                status: { currentState: 'idle', busyUntil: 0, lastUpdate: Date.now() }
            });
            this.completionTimer = null;
        }, duration);
    }

    clearAllTimers() {
        if (this.completionTimer) {
            clearTimeout(this.completionTimer);
            this.completionTimer = null;
        }
        if (this.buttonUpdateTimer) {
            clearTimeout(this.buttonUpdateTimer);
            this.buttonUpdateTimer = null;
        }
    }


    updateDisplay() {
        const { stats, status } = this.state;
        const now = Date.now();
        const isBusy = status.busyUntil > now;

        const images = {
            eating: './assets/images/margo/eating.jpg',
            playing: './assets/images/margo/playing.jpg',
            bathing: './assets/images/margo/bathing.jpg',
            sleeping: './assets/images/margo/sleeping.jpg',
            idle: './assets/images/margo/idle.jpg'
        };
        const img = document.querySelector('.mascot-display__image');
        if (img) img.src = images[status.currentState] || images.idle;

        const bars = {
            hunger: document.querySelector('.stat-row__bar--hunger'),
            humor: document.querySelector('.stat-row__bar--humor'),
            energy: document.querySelector('.stat-row__bar--energy'),
            hygiene: document.querySelector('.stat-row__bar--hygiene')
        };
        if (bars.hunger) bars.hunger.style.width = `${stats.hunger}%`;
        if (bars.humor) bars.humor.style.width = `${stats.humor}%`;
        if (bars.energy) bars.energy.style.width = `${stats.energy}%`;
        if (bars.hygiene) bars.hygiene.style.width = `${stats.hygiene}%`;

        const speech = document.querySelector('.mascot-speech');
        if (speech) {
            const phrases = {
                eating: 'QUE COMIDA BOA',
                playing: 'ISSO É MUITO DIVERTIDO',
                bathing: 'TÔ FICANDO LIMPINHA',
                sleeping: 'ZZZZZZZ',
                idle: stats.hunger < 30 ? 'ESTOU COM FOMINHA' : stats.energy < 30 ? 'QUE SONINHO' : stats.hygiene < 40 ? 'QUERO UM BANHO' : 'QUE BELO DIA'
            };
            speech.textContent = phrases[status.currentState] || phrases.idle;
        }

        const historyEl = document.querySelector('.mascot-history__log');
        if (historyEl && this.state.history.length) {
            historyEl.innerHTML = this.state.history.map(log => {
                const time = new Date(log.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                return `<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;">
                    <i class="ph ph-info mascot-history__icon"></i>
                    <p class="mascot-history__text">
                        <span class="mascot-history__user">${log.user}</span> ${log.text} às ${time} horas.
                    </p>
                </div>`;
            }).join('');
        }

        this.updateActionButtons(isBusy);
    }

    updateActionButtons(isBusy) {
        const buttons = document.querySelectorAll('.btn-action');
        const labels = ['COMER', 'BRINCAR', 'BANHO', 'DORMIR'];
        const status = this.state.status;
        const stateToIndex = { eating: 0, playing: 1, bathing: 2 };
        const isSleeping = status.currentState === 'sleeping';

        buttons.forEach((btn, i) => {
            if (this.currentUser === 'visitante') {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                return;
            }

            const isSleepBtn = i === 3;
            if (isBusy && i === stateToIndex[status.currentState]) {
                const sec = Math.ceil((status.busyUntil - Date.now()) / 1000);
                btn.textContent = `${sec}s`;
                btn.classList.add('btn-action--active');
            } else {
                btn.classList.remove('btn-action--active');
                btn.textContent = isSleepBtn ? (isSleeping ? 'ACORDAR' : 'DORMIR') : labels[i];

                const blocked = isBusy || (isSleeping && !isSleepBtn);
                btn.style.opacity = blocked ? '0.5' : '1';
                btn.style.cursor = blocked ? 'not-allowed' : 'pointer';
            }
        });

        if (isBusy) {
            if (this.buttonUpdateTimer) clearTimeout(this.buttonUpdateTimer);
            this.buttonUpdateTimer = setTimeout(() => this.updateDisplay(), 1000);
        } else {
            if (this.buttonUpdateTimer) {
                clearTimeout(this.buttonUpdateTimer);
                this.buttonUpdateTimer = null;
            }
        }
    }
}
