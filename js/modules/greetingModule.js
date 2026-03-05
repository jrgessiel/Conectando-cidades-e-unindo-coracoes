export class GreetingModule {
    update() {
        const agora = new Date();
        const hora = agora.getHours();
        let greet = "Boa noite, meu bem";

        if (hora >= 5 && hora < 12) greet = "Bom dia, meu bem";
        else if (hora >= 12 && hora < 18) greet = "Boa tarde, meu bem";

        const title = document.querySelector('.header__title');
        if (title) title.innerHTML = `${greet} <span id="heart-icon" class="pulse-heart">🤍</span>`;

        const dateBadge = document.querySelector('.header__date-badge span');
        if (dateBadge) {
            const options = { weekday: 'long', day: '2-digit', month: 'long' };
            let formatted = agora.toLocaleDateString('pt-BR', options);
            formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
            dateBadge.textContent = formatted;
        }
    }
}