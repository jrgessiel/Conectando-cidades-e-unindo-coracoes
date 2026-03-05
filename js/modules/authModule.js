export class AuthModule {
    constructor() {
        this.modal = document.getElementById('pin-modal');
    }

    showModal(callback) {
        document.documentElement.classList.add('auth-locked');
        this.modal.style.display = 'flex';
        this.setupListeners(callback);
    }

    hideModal() {
        this.modal.style.transition = 'opacity 0.3s ease';
        this.modal.style.opacity = '0';

        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modal.style.opacity = '1';
            document.documentElement.classList.remove('auth-locked');
        }, 300);
    }

    setupListeners(callback) {
        const digit1 = document.getElementById('digit-1');
        const digit2 = document.getElementById('digit-2');
        const btnSubmit = document.getElementById('btn-auth-submit');

        digit1?.addEventListener('input', () => digit1.value.length === 1 && digit2.focus());
        digit2?.addEventListener('keydown', e => e.key === 'Backspace' && !digit2.value && digit1.focus());

        const handleLogin = () => {
            const pin = (digit1.value + digit2.value).trim();
            let role = 'visitante';
            if (pin === '12') role = 'ela';
            else if (pin === '27') role = 'ele';

            localStorage.setItem('mascot_user_role', role);
            this.hideModal();
            callback(role);
        };

        btnSubmit?.addEventListener('click', handleLogin);
        digit2?.addEventListener('keypress', e => e.key === 'Enter' && handleLogin());
    }
}