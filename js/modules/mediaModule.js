import { Utils } from '../utils/utils.js';

export class MediaModule {
    constructor(appData) {
        this.appData = appData;
        this.indices = { movie: 0, series: 0, anime: 0 };
    }

    init() {
        this.renderMediaCards();
        this.attachNavListeners();
    }

    renderMediaCards() {
        this.renderMediaCard(0, this.appData.MOVIES[this.indices.movie], 'movie');
        this.renderMediaCard(1, this.appData.SERIES[this.indices.series], 'series');
        this.renderMediaCard(2, this.appData.ANIMES[this.indices.anime], 'anime');
    }

    renderMediaCard(index, data, type) {
        const cards = document.querySelectorAll('.media-card');
        const card = cards[index];
        if (!card || !data) return;

        card.querySelector('.media-card__img').src = data.cover;
        card.querySelector('.media-card__title').innerHTML = `${data.title} <span class="media-card__year">${data.year}</span>`;
        card.querySelector('.media-card__date').textContent = data.date || '';

        const stars = card.querySelectorAll('.media-card__rating i');
        stars.forEach((s, i) => s.className = i < (data.stars || 5) ? 'ph-fill ph-star' : 'ph ph-star');

        if (data.quote) {
            const review = card.querySelector('.media-card__review');
            if (review) review.textContent = `"${data.quote}"`;
        }
        if (data.progress) {
            const progress = card.querySelector('.progress-value');
            if (progress) progress.textContent = data.progress;
        }
    }

    navigate(type, direction) {
        const key = type.toUpperCase() + (type === 'series' ? '' : 'S');
        const collection = this.appData[key];
        if (!collection) return;

        const total = collection.length;
        this.indices[type] = (this.indices[type] + direction + total) % total;

        const cardIndex = type === 'movie' ? 0 : type === 'series' ? 1 : 2;
        this.renderMediaCard(cardIndex, collection[this.indices[type]], type);
    }

    attachNavListeners() {
        const navs = document.querySelectorAll('.media-card__nav');
        const types = ['movie', 'series', 'anime'];

        navs.forEach((nav, i) => {
            const icons = nav.querySelectorAll('i');
            const type = types[i];
            icons[0].onclick = () => this.navigate(type, -1);
            icons[1].onclick = () => this.navigate(type, 1);
        });
    }
}