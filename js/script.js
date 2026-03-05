import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, update, onDisconnect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyA1Z1IlvPTn9AmHTj5yeT3SvqfOSdzqgd0",
    authDomain: "nosso-cantinho-d78ac.firebaseapp.com",
    projectId: "nosso-cantinho-d78ac",
    storageBucket: "nosso-cantinho-d78ac.firebasestorage.app",
    messagingSenderId: "588619956786",
    appId: "1:588619956786:web:8f7f1f3dd6bf368b57722b",
    databaseURL: "https://nosso-cantinho-d78ac-default-rtdb.firebaseio.com"
};

const APP_DATA = {
    IMPORTANT_DATES: {
        herBirthday: { month: 7, day: 12 },
        hisBirthday: { month: 5, day: 27 },
        relationshipStart: { year: 2025, month: 11, day: 22 }
    },
    LOCATIONS: [
        { city: 'Manaus', label: 'Manaus' },
        { city: 'Bambui', label: 'Bambuí' }
    ],
    QUOTES: [
        { text: "Duvide do brilho das estrelas, duvide do movimento do sol, mas nunca duvide do meu amor.", author: "William Shakespeare" },
        { text: "Não há nada tão bárbaro e selvagem que não possa ser domado pela arte e pelo hábito.", author: "William Shakespeare" },
        { text: "Não conte com o arrependimento. Ele vem tarde demais.", author: "Kratos" },
        { text: "Eu não quero apenas viver. Eu quero que você viva ao meu lado.", author: "Connor" },
        { text: "Em algum lugar, algo incrível está esperando para ser descoberto.", author: "Carl Sagan" },
        { text: "Não há nada mais difícil do que ser honesto consigo mesmo.", author: "Fiódor Dostoiévski" },
        { text: "Não faz sentido ter o mundo inteiro se eu não tiver você.", author: "Geralt de Rivia" },
        { text: "Paramos de procurar monstros embaixo da nossa cama quando percebemos que eles estão dentro de nós.", author: "Batman" },
        { text: "O amor é a única coisa que somos capazes de perceber que transcende as dimensões do tempo e do espaço.", author: "Amelia Brand" },
        { text: "Ela era como uma borboleta rara, e eu a queria para mim.", author: "John Fowles" },
        { text: "Se eu fosse perder você, eu certamente me perderia.", author: "Joel Miller" },
        { text: "O amor é uma fumaça feita do vapor dos suspiros.", author: "William Shakespeare" },
        { text: "Eu prefiro confiar e me arrepender, do que duvidar e me arrepender.", author: "Kirito Kirigaya" },
        { text: "O coração humano é um mistério insondável.", author: "Fiódor Dostoiévski" },
        { text: "Ninguém pode nos dizer quem somos. Nós mesmos decidimos o nosso destino.", author: "Markus" },
        { text: "Eu te amaria em qualquer vida, em qualquer mundo, em qualquer tempo.", author: "Rick Grimes" },
        { text: "Não importa onde você esteja no mundo, eu prometo que vou te encontrar de novo.", author: "Taki Tachibana" },
        { text: "Meu amor é profundo: quanto mais te dou, mais tenho.", author: "William Shakespeare" },
        { text: "Há mais coisas entre o céu e a terra do que sonha a nossa vã filosofia.", author: "William Shakespeare" },
        { text: "Tudo em mim ama tudo em você.", author: "John Legend" },
        { text: "A única maneira de livrar-se de uma tentação é ceder a ela.", author: "Oscar Wilde" },
        { text: "Perdoe-me, por todas as coisas que fiz, mas principalmente por aquelas que não fiz.", author: "Donna Tartt" },
        { text: "Se você está comigo, eu não preciso de mais nada. Eu não me importo com o resto do mundo.", author: "Asuna Yuuki" },
        { text: "O amor é a única coisa que não precisa de lógica para existir.", author: "Violet Evergarden" },
        { text: "É um amor pobre aquele que se pode medir.", author: "William Shakespeare" },
        { text: "Eu gostaria de poder dizer que estou fazendo a diferença, mas não sei.", author: "Batman" },
        { text: "Feche o seu coração para a dor deles. Feche o seu coração para o sofrimento deles, mas nunca o feche para quem você ama.", author: "Kratos" },
        { text: "Mesmo na escuridão, eu te encontraria.", author: "Sarah J. Maas" },
        { text: "Em todo o tempo em que estivemos juntos, eu nunca quis estar em nenhum outro lugar.", author: "Joel Miller" },
        { text: "Depois de tudo o que passamos juntos, não pode ser em vão.", author: "Ellie Miller" },
        { text: "Você não pode ser um homem ruim e esperar que coisas boas aconteçam.", author: "Arthur Morgan" }
    ],
    MOVIES: [
        { title: "O amor move ondas", year: "2022", stars: 5, date: "25 de Dezembro de 2025 ", quote: "Onde tudo começou. Um bom filme que se tornou eterno para nós por ser o primeiro da nossa história assistida a dois.", cover: "https://images.justwatch.com/backdrop/301015537/s1920/pod-wiatr-2022.avif" },
        { title: "Nosso último verão", year: "2019", stars: 5, date: "26 de Dezembro de 2025 ", quote: "Onde o tempo parece parar e o verão se torna eterno. Um filme que reflete a leveza e a cumplicidade de estarmos construindo o nosso próprio caminho.", cover: "https://images.justwatch.com/backdrop/132410010/s1920/the-last-summer.avif" },
        { title: "O par perfeito", year: "2019", stars: 5, date: "29 de Dezembro de 2025 ", quote: "Um lembrete de que pares perfeitos não precisam de grandes produções, apenas da pessoa certa. E um lembrete de que a minha pessoa certa é você!", cover: "https://images.justwatch.com/backdrop/240743378/s1920/the-perfect-date.avif" },
        { title: "Dançarina perfeita", year: "2020", stars: 5, date: "01 de Janeiro de 2026 ", quote: "O primeiro filme do ano. Entre passos de dança e risadas, mergulhamos em conversas profundas sobre perdas e vida.", cover: "https://images.justwatch.com/backdrop/194636335/s1920/work-it.avif" },
        { title: "A caminho do verão", year: "2022", stars: 5, date: "03 de Janeiro de 2026 ", quote: "Para quem sempre viveu nas sombras, você é o meu amanhecer. Mais um bom capítulo escrito na nossa historia. Gosto muito de você!", cover: "https://images.justwatch.com/backdrop/274890593/s1920/along-for-the-ride.avif" },
        { title: "Como treinar o seu dragão", year: "2010", stars: 5, date: "13 de Janeiro de 2026 ", quote: "Que sorte a minha poder assistir ao primeiro filme da minha franquia de animação favorita, agora com minha pessoa favorita.", cover: "https://images.justwatch.com/backdrop/246799588/s1920/como-treinar-o-seu-dragao.avif" },
        { title: "Como treinar o seu dragão 2", year: "2014", stars: 5, date: "16 de Janeiro de 2026 ", quote: "A sorte se repete. Agora, com o melhor filme da franquia, continuo a saga ainda com minha pessoa favorita, tornando tudo ainda mais especial.", cover: "https://images.justwatch.com/backdrop/301786713/s1920/drachenzahmen-leicht-gemacht-2.avif" },
        { title: "Your name", year: "2016", stars: 5, date: "23 de Janeiro de 2026 ", quote: "Nem o tempo e nem a distância mudam o que está destinado. Um filme sobre conexões de almas, assistida com a minha.", cover: "https://images.justwatch.com/backdrop/201593434/s1440/teu-nome.avif" },
        { title: "Palavras que borbulham feito refrigente", year: "2021", stars: 4, date: "25 de Janeiro de 2026 ", quote: "Tão doce e refrescante quanto o título sugere. Um lembrete de que não precisamos esconder quem somos um com outro.", cover: "https://images.justwatch.com/backdrop/324388556/s1440/saidanoyouniyan-xie-gayong-kishang-garu.avif" },
        { title: "La La Land: Cantando Estações", year: "2016", stars: 5, date: "27 de Janeiro de 2026 ", quote: "Entre cores e melodias, um lembrete de que o amor é o que nos ajuda a ser quem somos. Obrigado por tornar meu mundo mais colorido.", cover: "https://images.justwatch.com/backdrop/65048167/s1440/la-la-land.avif" },
        { title: "Violet Evergarden: O Filme", year: "2020", stars: 5, date: "29 de Janeiro de 2026 ", quote: "Um filme sobre sentimentos que transcendem através de cartas, assistido com quem dá sentido aos meus.", cover: "https://images.justwatch.com/backdrop/332072869/s1920/violet-evergarden-the-movie.avif" },
        { title: "O último verão", year: "2016", stars: 5, date: "08 de Fevereiro de 2026 ", quote: "Um filme sobre despedidas, futuros incertos e o valor de amores e amizades, assistido com você. Obrigado por sempre me acompanhar.", cover: "https://images.justwatch.com/backdrop/319654071/s1440/o-ultimo-verao-2016.avif" },
        { title: "Tick, Tick... Booom!", year: "2021", stars: 4, date: "11 de Fevereiro de 2026 ", quote: "Para quem não curte tanto musicais, esse toca o coração. O tique-taque nos lembra que o tempo pode ser curto, mas que bom que estamos passando juntos.", cover: "https://images.justwatch.com/backdrop/257956729/s1440/tick-tick-boom.avif" },
        { title: "As Leis da Termodinâmica", year: "2018", stars: 5, date: "18 de Fevereiro de 2026 ", quote: "Eles podem até tentar explicar a atração e o caos do universo, mas nenhuma ciência explica a sorte que é estarmos orbitando um ao outro.", cover: "https://images.justwatch.com/backdrop/7295266/s1440/the-laws-of-thermodynamics.avif" },
        { title: "De repetente é amor", year: "2005", stars: 5, date: "01 de Março de 2026 ", quote: "Sete anos ou sete segundos: não importa quanto tempo leve, quando é a pessoa certa o amor deixa de ser um conceito e passa a ter um nome.", cover: "https://images.justwatch.com/backdrop/147960455/s1920/de-repente-e-amor.avif" },
    ],

    SERIES: [
        { title: "Outlander", year: "2014", stars: 5, date: "09 de Fevereiro de 2026", progress: "T1 : E2", cover: "https://images.justwatch.com/backdrop/305389828/s1920/outlander.avif" },
        { title: "The Vampire Diaries", year: "2009", stars: 5, date: "11 de Janeiro de 2026", progress: "T1 : E1", cover: "https://images.justwatch.com/backdrop/178039414/s1920/diarios-de-um-vampiro.avif" },
        { title: "A Knight of the Seven Kingdoms", year: "2026", stars: 1, date: "16 de Fevereiro de 2026", progress: "T1 : E5", cover: "https://images.justwatch.com/backdrop/337757110/s1920/a-knight-of-the-seven-kingdoms-the-hedge-knight.avif" }
    ],
    ANIMES: [
        { title: "Overlord", year: "2015", stars: 4, date: "06 de Janeiro de 2026", progress: "T1 : E12", cover: "https://images.justwatch.com/backdrop/339630570/s1920/temporada-1.avif" },
        { title: "Violet Evergarden", year: "2018", stars: 5, date: "29 de Janeiro de 2026", progress: "T1 : E13", cover: "https://images.justwatch.com/backdrop/320205246/s640/vuaioretsutoevuagaden.avif" },
        { title: "The Fragrant Flower Blooms with Dignity", year: "2025", stars: 5, date: "01 de Fevereiro de 2026", progress: "T1 : E13", cover: "https://images.justwatch.com/backdrop/332746080/s1920/the-fragrant-flower-blooms-with-dignity.avif" },
        { title: "Pelo Prisma do Amor", year: "2026", stars: 2, date: "07 de Fevereiro de 2026", progress: "T1 : E20", cover: "https://images.justwatch.com/backdrop/339085530/s1920/pelo-prisma-do-amor.avif" }
    ],
    MUSIC: [
        { title: "Like a Stone", artist: "Audioslave" },
        { title: "Tennessee Whiskey", artist: "Chris Stapleton" },
        { title: "Soldier Side", artist: "System of a Down" },
        { title: "Exile (feat. Bon Iver)", artist: "Taylor Swift" },
        { title: "Mockingbird", artist: "Eminem" },
        { title: "Snuff", artist: "Corey Taylor" },
        { title: "No. 1 Party Anthem", artist: "Arctic Monkeys" },
        { title: "Lose Control", artist: "Teddy Swims" },
        { title: "Disfruto", artist: "Carla Morrison" },
        { title: "Broken", artist: "Seether" },
        { title: "Outra Vida", artist: "Armandinho" },
        { title: "West Coast", artist: "Lana Del Rey" },
        { title: "Flawless", artist: "The Neighbourhood" },
        { title: "Home", artist: "Corey Taylor" },
        { title: "Lost in the fire", artist: "The Weeknd" },
        { title: "Something in The Way", artist: "Nirvana" },
        { title: "Wet dreams", artist: "Artemas" },
        { title: "Love is a Bitch", artist: "Two Feet" },
        { title: "Over my head", artist: "updog" },
        { title: "True Faith", artist: "Ashley Johnson" },
        { title: "In my head", artist: "Bedroom" },
        { title: "Imperfect", artist: "Stone Sour" },
        { title: "505", artist: "Arctic Monkeys" },
        { title: "Is There Someone Else?", artist: "The Weeknd" },
        { title: "Apocalypse", artist: "Cigarettes After Sex" },
        { title: "Future Days", artist: "Troy Baker" },
        { title: "3 Libras", artist: "A Perfect Circle" },
        { title: "Wires", artist: "The Neighbourhood" },
        { title: "Cloud", artist: "Elias" },
        { title: "K.", artist: "Cigarettes After Sex" },
        { title: "Nutshell", artist: "Alice in Chains" },
        { title: "Chão de Giz", artist: "Zé Ramalho" },
        { title: "One Last Breath", artist: "Creed" },
        { title: "Nervous", artist: "The Neighbourhood" },
        { title: "Butterflies", artist: "Abe Parker" },
        { title: "Te Regalo", artist: "Carla Morrison" },
        { title: "Last First Kiss", artist: "Abe Parker" },
        { title: "Na Sua Estante", artist: "Pitty" },
        { title: "Demons", artist: "Imagine Dragons" },
        { title: "I'll Keep Coming", artist: "Low Roar" },
        { title: "Red Hearts", artist: "Marlon Funaki" },
        { title: "Animals", artist: "Maroon 5" },
        { title: "Eres Tú", artist: "Carla Morrison" },
        { title: "Meddle About", artist: "Chase Atlantic" },
        { title: "Forever and a day", artist: "Abe Parker" },
        { title: "Don't Be so Serious", artist: "Low Roar" },
        { title: "Imposter Syndrome", artist: "Abe Parker" },
        { title: "Through the Valley", artist: "Ashley Johnson" },
        { title: "A Different Age", artist: "Current Joys" },
        { title: "Put It on Me", artist: "Matt Maeson" },
        { title: "Moth To a Flame", artist: "The Weeknd" },
        { title: "My Love Mine All Mine", artist: "Mitski" },
        { title: "Palavras Ao Vento", artist: "Cássia Eller" },
        { title: "To the Wilder feat. Elle Fanning", artist: "WOODKID" },
        { title: "Who Do You Want", artist: "Ex Habit" },
        { title: "Raindrops Keep Falling on my Head", artist: "B J Thomas" },
        { title: "Lonely day", artist: "System of a down" },
        { title: "Call Out My Name", artist: "The Weeknd" },
        { title: "Black", artist: "Pearl Jam" },
        { title: "My Life Is Going On", artist: "Cecilia Krull" },
        { title: "The Less I Know The Better", artist: "Tame Impala" },
        { title: "Pink Bathwater", artist: "Favourite Daughter" },
        { title: "Vermillion", artist: "Slipknot" },
        { title: "Sleep On The Floor", artist: "The Lumineers" },
        { title: "Until Now", artist: "Abe Parker" },
        { title: "Devotion", artist: "Montell Fish" },
        { title: "Ainda Gosto Dela", artist: "Skank" },
        { title: "Crazy About You", artist: "Abe Parker" },
        { title: "Daddy Issues", artist: "The Neighbourhood" },
        { title: "When I R.I.P.", artist: "Labrinth" },
        { title: "Compartir", artist: "Carla Morrison" },
        { title: "Blue Eyes", artist: "Abe Parker" },
        { title: "W.D.Y.W.F.M?", artist: "The Neighbourhood" },
        { title: "Just want u to feel something", artist: "Artemas" },
        { title: "Cherry Wine", artist: "Hozier" },
        { title: "One More Night", artist: "Maroon 5" },
        { title: "RU Mine?", artist: "Arctic Monkeys" },
        { title: "Você me faz tão bem", artist: "Detonautas" },
        { title: "Cigarette Daydreams", artist: "Cage the Elephant" },
        { title: "Don't Cry", artist: "Guns N' Roses" },
        { title: "Crying Lightning", artist: "Arctic Monkeys" },
        { title: "The Night We Met", artist: "Lord Huron" },
        { title: "Bother", artist: "Stone Sour" },
        { title: "Olhos Certos", artist: "Detonautas" },
        { title: "Sad Girl", artist: "Lana Del Rey" },
        { title: "Taciturn", artist: "Stone Sour" },
        { title: "Wicked Game", artist: "Chris Isaak" },
        { title: "Tempo Perdido", artist: "Legião Urbana" },
        { title: "Sitting, Waiting, Wishing", artist: "Jack Johnson" },
        { title: "Shut up My Moms Calling", artist: "Hotel Ugly" },
        { title: "Self Sabotage", artist: "Abe Parker" },
        { title: "Become The Warm Jets", artist: "Current Joys" },
        { title: "Do It For Me", artist: "Rosenfeld" },
        { title: "L.L.L.", artist: "MYTH & ROID" },
        { title: "Radio/Video", artist: "System Of A Down" },
        { title: "Fire In My Head", artist: "Two Feet" },
        { title: "Heartburn", artist: "Wafia" },
        { title: "The Color Violet", artist: "Tory Lanez" },
        { title: "Sweater Weather", artist: "The Neighbourhood" },
        { title: "Softcore", artist: "The Neighbourhood" }
    ]
};

const App = {
    state: {
        indices: { movie: 0, series: 0, anime: 0 },
        mascot: { hunger: 80, energy: 80, hygiene: 100, humor: 100 },
        mascotStatus: { currentState: 'idle', busyUntil: 0, lastUpdate: 0 },
        isTogether: false,
        audio: { current: null, button: null }
    },
    currentUser: null,
    db: null,

    init() {
        const savedRole = localStorage.getItem('mascot_user_role');
        if (savedRole) {
            this.currentUser = savedRole;
            const modal = document.getElementById('pin-modal');
            if (modal) modal.remove();
            document.documentElement.classList.remove('auth-locked');
            this.startEngine();
        } else {
            document.documentElement.classList.add('auth-locked');
            this.setupAuth();
        }
    },

    setupAuth() {
        const modal = document.getElementById('pin-modal');
        const digit1 = document.getElementById('digit-1');
        const digit2 = document.getElementById('digit-2');
        const btnSubmit = document.getElementById('btn-auth-submit');

        digit1.addEventListener('input', (e) => { if (e.target.value.length === 1) digit2.focus(); });
        digit2.addEventListener('keydown', (e) => { if (e.key === 'Backspace' && e.target.value === '') digit1.focus(); });

        const handleLogin = () => {
            const pin = digit1.value + digit2.value;
            let role = 'visitante';
            if (pin === '12') role = 'ela';
            else if (pin === '27') role = 'ele';

            localStorage.setItem('mascot_user_role', role);
            this.currentUser = role;
            document.documentElement.classList.remove('auth-locked');
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '0';

            setTimeout(() => {
                modal.remove();
                this.startEngine();
            }, 300);
        };

        btnSubmit.addEventListener('click', handleLogin);
        digit2.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
    },

    startEngine() {
        const firebaseApp = initializeApp(FIREBASE_CONFIG);
        this.db = getDatabase(firebaseApp);

        this.registerEventListeners();
        this.setupFirebaseSync();
        this.refreshUI();
        this.fetchWeatherData();
    },


    setupFirebaseSync() {
        if (this.currentUser !== 'visitante') {
            const presenceRef = ref(this.db, `online/${this.currentUser}_${Math.random().toString(36).substring(2, 5)}`);
            set(presenceRef, true);
            onDisconnect(presenceRef).remove();
        }

        onValue(ref(this.db, 'online/'), (snapshot) => {
            this.state.isTogether = snapshot.size >= 2;
            this.updateTogetherStatus();
        });

        onValue(ref(this.db, 'mascot/'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.state.mascot = data.stats;
                this.state.mascotStatus = data.status;
                this.state.mascotHistory = data.history || [];

                const now = Date.now();
                if (this.currentUser !== 'visitante' && (now - data.status.lastUpdate > 60000)) {
                    this.applyPassiveDecay(data);
                }
                this.updateMascotDisplay();
            }
        });

        onValue(ref(this.db, 'stream/'), (snapshot) => {
            this.handleStreamUpdate(snapshot.val());
        });
    },

    updateMascotDisplay() {
        const stats = this.state.mascot;
        const status = this.state.mascotStatus;
        const history = this.state.mascotHistory || [];
        const now = Date.now();


        const mascotImages = {
            'eating': './assets/images/margo/eating.jpg',
            'playing': './assets/images/margo/playing.jpg',
            'bathing': './assets/images/margo/bathing.jpg',
            'sleeping': './assets/images/margo/sleeping.jpg',
            'idle': './assets/images/margo/idle.jpg'
        };


        const mascotImgElement = document.querySelector('.mascot-display__image');
        if (mascotImgElement) {
            const currentImage = mascotImages[status.currentState] || mascotImages['idle'];
            if (!mascotImgElement.src.includes(currentImage.replace('./', ''))) {
                mascotImgElement.src = currentImage;
            }
        }

        const isBusy = status.busyUntil > now;
        if (!isBusy && !['idle', 'sleeping'].includes(status.currentState)) {
            update(ref(this.db, 'mascot/status'), { currentState: 'idle' });
            return;
        }

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

        const speechBubble = document.querySelector('.mascot-speech');
        if (speechBubble) {
            const phrases = {
                'eating': 'QUE COMIDA BOA',
                'playing': 'ISSO É MUITO DIVERTIDO',
                'bathing': 'TÔ FICANDO LIMPINHA',
                'sleeping': 'ZZZZZZZ',
                'idle': stats.hunger < 30 ? 'ESTOU COM FOMINHA' :
                    stats.energy < 30 ? 'QUE SONINHO' :
                        stats.hygiene < 40 ? 'QUERO UM BANHO' :
                            'QUE BELO DIA'
            };
            speechBubble.textContent = phrases[status.currentState] || phrases['idle'];
        }

        const historyContainer = document.querySelector('.mascot-history__log');
        if (historyContainer && history.length > 0) {
            historyContainer.innerHTML = history.map(log => {
                const time = new Date(log.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                return `
                    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                        <i class="ph ph-info mascot-history__icon"></i>
                        <p class="mascot-history__text">
                            <span class="mascot-history__user">${log.user}</span>
                            ${log.text} às ${time} horas.
                        </p>
                    </div>
                `;
            }).join('');
        }

        const actionButtons = document.querySelectorAll('.btn-action');
        const labels = ['COMER', 'BRINCAR', 'BANHO', 'DORMIR'];
        const isSleeping = status.currentState === 'sleeping';
        const stateToIndex = { 'eating': 0, 'playing': 1, 'bathing': 2 };

        actionButtons.forEach((btn, index) => {
            if (this.currentUser === 'visitante') {
                btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed';
                return;
            }

            const isSleepBtn = (index === 3);

            if (isBusy && index === stateToIndex[status.currentState]) {
                const secondsLeft = Math.ceil((status.busyUntil - now) / 1000);
                btn.textContent = `${secondsLeft}s`;
                btn.classList.add('btn-action--active');
            } else {
                btn.classList.remove('btn-action--active');
                if (isSleepBtn) btn.textContent = isSleeping ? 'ACORDAR' : 'DORMIR';
                else btn.textContent = labels[index];

                const shouldBlock = isBusy || (isSleeping && !isSleepBtn);
                btn.style.opacity = shouldBlock ? '0.5' : '1';
                btn.style.cursor = shouldBlock ? 'not-allowed' : 'pointer';
            }
        });

        if (isBusy) {
            if (this.timerTimeout) clearTimeout(this.timerTimeout);
            this.timerTimeout = setTimeout(() => this.updateMascotDisplay(), 1000);
        }
    },

    async handleMascotAction(index) {
        const now = Date.now();
        const status = this.state.mascotStatus;
        const stats = { ...this.state.mascot };

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
                    mutation = { hunger: 30, hygiene: -5, energy: -5, humor: 5 };
                    newState = 'eating'; duration = 30000; actionText = 'alimentou';
                    break;
                case 1:
                    mutation = { humor: 25, hygiene: -15, hunger: -10, energy: -20 };
                    newState = 'playing'; duration = 30000; actionText = 'brincou com ela';
                    break;
                case 2:
                    mutation = { hygiene: 100 - stats.hygiene, energy: 5, humor: 10 };
                    newState = 'bathing'; duration = 30000; actionText = 'deu banho nela';
                    break;
            }

            const modifier = (stats.humor < 30 ? 0.5 : 1) * (this.state.isTogether ? 2 : 1);
            for (let key in mutation) {
                stats[key] = Utils.clamp(stats[key] + (mutation[key] > 0 ? mutation[key] * modifier : mutation[key]));
            }
        }

        const userName = this.currentUser === 'ela' ? 'Heloise' : 'Gessiel';
        const history = [{
            user: userName,
            text: actionText,
            timestamp: now
        }];

        await update(ref(this.db, 'mascot'), {
            stats: stats,
            status: {
                currentState: newState,
                busyUntil: now + duration,
                lastUpdate: now
            },
            history: history
        });
    },

    updateTogetherStatus() {
        const heart = document.getElementById('heart-icon');
        if (heart) {
            heart.textContent = this.state.isTogether ? '❤️' : '🤍';
            heart.className = this.state.isTogether ? 'pulse-heart' : '';
        }
    },

    applyPassiveDecay(data) {
        const now = new Date();
        const lastUpdate = new Date(data.status.lastUpdate);
        const diffInHours = (now - lastUpdate) / (1000 * 60 * 60);
        if (diffInHours < 0.5) return;

        let { hunger, energy, hygiene, humor } = { ...data.stats };
        let needsUpdate = true;

        if (data.status.currentState === 'sleeping') {
            energy = Math.min(100, energy + (20 * diffInHours));
        } else {
            energy = Math.max(0, energy - (10 * diffInHours));
        }

        hygiene = Math.max(0, hygiene - (10 * diffInHours));
        humor = Math.max(0, humor - (5 * diffInHours));

        [10, 13, 16, 20].forEach(h => {
            const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, 0, 0);

            if (lastUpdate < targetTime && now >= targetTime) {
                hunger = Math.max(0, hunger - (h === 13 || h === 20 ? 40 : 10));
            }
        });

        update(ref(this.db, 'mascot/stats'), { hunger, energy, hygiene, humor });
        update(ref(this.db, 'mascot/status'), { lastUpdate: Date.now() });
    },

    refreshUI() {
        this.updateGreetings();
        this.updateDailyQuote();
        this.updateDailyMusic();
        this.renderMediaCards();
    },

    updateGreetings() {
        const agora = new Date();
        const hora = agora.getHours();

        let greet = "Boa noite, meu bem";
        if (hora >= 5 && hora < 12) greet = "Bom dia, meu bem";
        else if (hora >= 12 && hora < 18) greet = "Boa tarde, meu bem";

        const title = document.querySelector('.header__title');
        if (title) title.innerHTML = `${greet} <span id="heart-icon">🤍</span>`;

        const dateBadge = document.querySelector('.header__date-badge span');
        if (dateBadge) {
            const opcoes = { weekday: 'long', day: '2-digit', month: 'long' };
            let dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);

            dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

            dateBadge.textContent = dataFormatada;
        }
    },

    updateDailyQuote() {
        const quote = Utils.getDailyShuffledItem(APP_DATA.QUOTES);
        if (quote) {
            document.querySelector('.quote__text').textContent = `"${quote.text}"`;
            document.querySelector('.quote__author').textContent = quote.author;
        }
    },

    async updateDailyMusic() {
        const musicItems = document.querySelectorAll('.music-item');
        for (let i = 0; i < 2; i++) {
            const song = Utils.getDailyShuffledItem(APP_DATA.MUSIC, i, 2);
            if (!song || !musicItems[i]) continue;

            musicItems[i].querySelector('.music-item__name').textContent = song.title;
            musicItems[i].querySelector('.music-item__artist').textContent = song.artist;

            try {
                const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(song.title + ' ' + song.artist)}&entity=musicTrack&limit=1`);
                const data = await res.json();
                if (data.results?.[0]) {
                    const track = data.results[0];
                    musicItems[i].querySelector('.music-item__cover').src = track.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
                    musicItems[i].querySelector('.music-item__play').onclick = (e) => this.handleMusicPlayback(track.previewUrl, e.currentTarget);
                }
            } catch (e) { console.error(e); }
        }
    },

    handleMusicPlayback(url, button) {
        if (this.state.audio.current && this.state.audio.current.src !== url) {
            this.state.audio.current.pause();
            if (this.state.audio.button) this.state.audio.button.innerHTML = '<i class="ph ph-play-circle"></i>';
        }
        if (!this.state.audio.current || this.state.audio.current.src !== url) {
            this.state.audio.current = new Audio(url);
            this.state.audio.button = button;

            this.state.audio.current.addEventListener('ended', () => {
                if (this.state.audio.button) {
                    this.state.audio.button.innerHTML = '<i class="ph ph-play-circle"></i>';
                }
            });
        }
        if (this.state.audio.current.paused) {
            this.state.audio.current.play();
            button.innerHTML = '<i class="ph-fill ph-pause-circle"></i>';
        } else {
            this.state.audio.current.pause();
            button.innerHTML = '<i class="ph ph-play-circle"></i>';
        }
    },

    navigateMedia(type, collection, direction, cardIndex) {
        if (!collection) return;
        const total = collection.length;
        this.state.indices[type] = (this.state.indices[type] + direction + total) % total;
        this.renderMediaCard(cardIndex, collection[this.state.indices[type]]);
    },

    renderMediaCards() {
        this.renderMediaCard(0, APP_DATA.MOVIES[this.state.indices.movie]);
        this.renderMediaCard(1, APP_DATA.SERIES[this.state.indices.series]);
        this.renderMediaCard(2, APP_DATA.ANIMES[this.state.indices.anime]);
    },

    renderMediaCard(index, data) {
        const card = document.querySelectorAll('.media-card')[index];
        if (!card || !data) return;
        card.querySelector('.media-card__img').src = data.cover;
        card.querySelector('.media-card__title').innerHTML = `${data.title} <span class="media-card__year">${data.year}</span>`;
        card.querySelector('.media-card__date').textContent = data.date;
        const stars = card.querySelectorAll('.media-card__rating i');
        stars.forEach((s, i) => s.className = i < data.stars ? 'ph-fill ph-star' : 'ph ph-star');
        if (data.quote) {
            const reviewEl = card.querySelector('.media-card__review');
            if (reviewEl) reviewEl.textContent = `"${data.quote}"`;
        }
        if (data.progress) {
            const progressEl = card.querySelector('.progress-value');
            if (progressEl) progressEl.textContent = data.progress;
        }
    },

    handleStreamUpdate(data) {
        const container = document.getElementById('stream-container');
        const titleEl = document.getElementById('stream-title');
        const overlay = document.getElementById('video-overlay');
        const wrapper = document.getElementById('video-wrapper');

        if (!data || !data.isActive) {
            if (container) container.style.display = 'none';
            if (wrapper) wrapper.innerHTML = '';
            return;
        }

        if (container) {
            container.style.display = 'block';
            container.classList.toggle('video-banner--offline', !data.isOnline);
        }

        if (titleEl) {
            const statusPrefix = data.isOnline ? "AO VIVO: " : "OFFLINE: ";
            titleEl.textContent = statusPrefix + (data.title || "Transmissão");
        }

        if (overlay) {
            overlay.onclick = data.isOnline ? () => {
                overlay.style.display = 'none';
                if (wrapper) {
                    wrapper.innerHTML = `
                    <iframe 
                        src="${data.url}" 
                        allow="autoplay; camera; microphone; fullscreen" 
                        style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;">
                    </iframe>`;
                }
            } : null;
        }
    },

    async fetchWeatherData() {
        APP_DATA.LOCATIONS.forEach(async (loc, index) => {
            try {
                const res = await fetch(`https://wttr.in/${encodeURIComponent(loc.city)}?format=j1&lang=pt`);
                const data = await res.json();
                const items = document.querySelectorAll('.weather-item');
                if (items[index]) {
                    items[index].querySelector('.weather-item__temp').textContent = `${data.current_condition[0].temp_C}°`;
                    items[index].querySelector('.weather-item__condition').textContent = data.current_condition[0].lang_pt?.[0]?.value || data.current_condition[0].weatherDesc[0].value;
                }
            } catch (e) { console.warn(e); }
        });
    },

    registerEventListeners() {
        const types = ['movie', 'series', 'anime'];
        document.querySelectorAll('.media-card__nav').forEach((nav, i) => {
            const icons = nav.querySelectorAll('i');
            const type = types[i];
            const key = type.toUpperCase() + (type === 'series' ? '' : 'S');
            icons[0].onclick = () => this.navigateMedia(type, APP_DATA[key], -1, i);
            icons[1].onclick = () => this.navigateMedia(type, APP_DATA[key], 1, i);
        });

        document.querySelectorAll('.btn-action').forEach((btn, i) => {
            btn.onclick = () => this.handleMascotAction(i);
        });
    }
};

const Utils = {
    getDailyShuffledItem: (array, offset = 0, step = 1) => {
        if (!array?.length) return null;

        const diffInDays = Math.floor((new Date() - new Date(2002, 5, 27)) / 86400000);
        const globalIndex = (diffInDays * step) + offset;

        const indices = Array.from(array.keys());
        const seed = 122227;

        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Utils.predictableRandom(seed + i) * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        return array[indices[globalIndex % indices.length]];
    },

    predictableRandom: (x) => {
        const s = Math.sin(x) * 10000;
        return s - Math.floor(s);
    },

    clamp: (val, min = 0, max = 100) => Math.min(max, Math.max(min, val))
};

document.addEventListener('DOMContentLoaded', () => App.init());