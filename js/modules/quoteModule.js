import { Utils } from '../utils/utils.js';

export class QuoteModule {
    constructor(quotesData) {
        this.quotesData = quotesData;
    }

    init() {
        const quote = Utils.getDailyShuffledItem(this.quotesData);
        if (!quote) return;

        document.querySelector('.quote__text').textContent = `"${quote.text}"`;
        document.querySelector('.quote__author').textContent = quote.author;
    }
}