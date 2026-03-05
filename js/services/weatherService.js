export class WeatherService {
    constructor() {}

    async fetchAndRender() {
        const locations = [
            { city: 'Manaus', selectorIndex: 0 },
            { city: 'Bambui', selectorIndex: 1 }
        ];

        for (const loc of locations) {
            try {
                const res = await fetch(`https://wttr.in/${encodeURIComponent(loc.city)}?format=j1&lang=pt`);
                const data = await res.json();
                const items = document.querySelectorAll('.weather-item');
                const item = items[loc.selectorIndex];

                if (item) {
                    item.querySelector('.weather-item__temp').textContent = `${data.current_condition[0].temp_C}°`;
                    const conditionEl = item.querySelector('.weather-item__condition');
                    conditionEl.textContent = data.current_condition[0].lang_pt?.[0]?.value || 
                                           data.current_condition[0].weatherDesc[0].value;
                }
            } catch (e) {
                console.warn(`Erro ao buscar clima de ${loc.city}:`, e);
            }
        }
    }
}