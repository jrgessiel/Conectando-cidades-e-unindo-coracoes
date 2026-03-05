import { FirebaseService } from './services/firebaseService.js';
import { APP_DATA } from './data/appData.js';
import { AuthModule } from './modules/authModule.js';
import { UIModule } from './modules/uiModule.js';
import { MascotModule } from './modules/mascotModule.js';
import { MediaModule } from './modules/mediaModule.js';
import { QuoteModule } from './modules/quoteModule.js';
import { GreetingModule } from './modules/greetingModule.js';
import { WeatherService } from './services/weatherService.js';
import { MusicService } from './services/musicService.js';

class App {
    constructor() {
        this.firebase = new FirebaseService();
        this.auth = new AuthModule();
        this.ui = new UIModule();
        this.mascot = new MascotModule(this.firebase);
        this.media = new MediaModule(APP_DATA);
        this.quote = new QuoteModule(APP_DATA.QUOTES);
        this.greeting = new GreetingModule();
        this.weather = new WeatherService();
        this.music = new MusicService(APP_DATA.MUSIC);
    }

    async init() {
        const savedRole = localStorage.getItem('mascot_user_role');

        if (savedRole) {
            this.auth.hideModal();
            await this.start(savedRole);
        } else {
            this.auth.showModal(role => this.start(role));
        }
    }

    async start(role) {
        this.ui.setCurrentUser(role);
        await this.firebase.setPresence(role);

        this.firebase.onOnlineChange(isTogether => {
            this.ui.updateTogetherStatus(isTogether);
            this.mascot.setIsTogether(isTogether);
        });

        this.firebase.onStreamChange(data => this.ui.handleStreamUpdate(data));

        this.mascot.init(role);
        this.media.init();
        this.quote.init();
        this.greeting.update();
        this.weather.fetchAndRender();
        this.music.loadDailySongs();

        this.ui.attachEventListeners(this);
    }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());