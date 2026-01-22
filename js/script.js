import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, onDisconnect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA1Z1IlvPTn9AmHTj5yeT3SvqfOSdzqgd0",
    authDomain: "nosso-cantinho-d78ac.firebaseapp.com",
    projectId: "nosso-cantinho-d78ac",
    storageBucket: "nosso-cantinho-d78ac.firebasestorage.app",
    messagingSenderId: "588619956786",
    appId: "1:588619956786:web:8f7f1f3dd6bf368b57722b",
    databaseURL: "https://nosso-cantinho-d78ac-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const myPresenceRef = ref(db, 'online/' + Math.random().toString(36).substr(2, 9));
const allPresenceRef = ref(db, 'online/');
set(myPresenceRef, true);
onDisconnect(myPresenceRef).remove();

onValue(allPresenceRef, (snapshot) => {
    const onlineCount = snapshot.size;
    const heart = document.getElementById('heart-icon');
    if (heart) {
        if (onlineCount >= 2) { heart.classList.add('pulse-heart'); heart.textContent = '❤️'; }
        else { heart.classList.remove('pulse-heart'); heart.textContent = '🤍'; }
    }
});

const liveRef = ref(db, 'stream/');
onValue(liveRef, (snapshot) => {
    const data = snapshot.val();
    const liveCard = document.getElementById('live-card');
    const iframe = document.getElementById('live-iframe');
    const title = document.getElementById('live-title');

    if (data && data.isActive && data.url) {
        liveCard.style.display = 'block';
        if (iframe.src !== data.url) iframe.src = data.url;
        if (data.title) title.textContent = data.title;
    } else {
        liveCard.style.display = 'none';
        iframe.src = '';
    }
});

(function () {
    "use-strict";

    function seededRandom(seed) {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    const getDayOfYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const getShuffledItem = (array, offset = 0, step = 1) => {
        if (!array || array.length === 0) return null;
        const now = new Date();
        const dayOfYear = getDayOfYear();
        const year = now.getFullYear();

        const globalIndex = (dayOfYear * step) + offset;

        const cycle = Math.floor(globalIndex / array.length);

        const indexInCycle = globalIndex % array.length;

        let indices = Array.from({ length: array.length }, (_, i) => i);

        let seed = year + (cycle * 128276);

        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom(seed) * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
            seed++;
        }
        return array[indices[indexInCycle]];
    };

    const CONFIG = {
        DATES: {
            her: { month: 7, day: 12 },
            his: { month: 5, day: 27 },
            meeting: { year: 2025, month: 11, day: 22 }
        },
        QUOTES: [
            { text: "Meu amor é profundo: quanto mais te dou, mais tenho.", author: "William Shakespeare" },
            { text: "Em algum lugar, algo incrível está esperando para ser descoberto.", author: "Carl Sagan" },
            { text: "Depois de tudo o que passamos juntos, não pode ser em vão.", author: "Ellie Miller" },
            { text: "Mesmo na escuridão, eu te encontraria.", author: "Sarah J. Maas" },
            { text: "A única maneira de livrar-se de uma tentação é ceder a ela.", author: "Oscar Wilde" },
            { text: "É um amor pobre aquele que se pode medir.", author: "William Shakespeare" },
            { text: "Você não pode ser um homem ruim e esperar que coisas boas aconteçam.", author: "Arthur Morgan" },
            { text: "Perdoe-me, por todas as coisas que fiz, mas principalmente por aquelas que não fiz.", author: "Donna Tartt" },
            { text: "Não há nada tão bárbaro e selvagem que não possa ser domado pela arte e pelo hábito.", author: "William Shakespeare" },
            { text: "Ela era como uma borboleta rara, e eu a queria para mim.", author: "John Fowles" },
            { text: "Não há nada mais difícil do que ser honesto consigo mesmo.", author: "Fiódor Dostoiévski" },
            { text: "O coração humano é um mistério insondável.", author: "Fiódor Dostoiévski" },
            { text: "Há mais coisas entre o céu e a terra do que sonha a nossa vã filosofia.", author: "William Shakespeare" },
            { text: "O amor é uma fumaça feita do vapor dos suspiros.", author: "William Shakespeare" },
            { text: "Se eu fosse perder você, eu certamente me perderia.", author: "Joel Miller" },
            { text: "Tudo em mim ama tudo em você.", author: "John Legend" },
            { text: "Eu gostaria de poder dizer que estou fazendo a diferença, mas não sei.", author: "Batman" },
            { text: "Paramos de procurar monstros embaixo da nossa cama quando percebemos que eles estão dentro de nós.", author: "Batman" },
            { text: "Eu prefiro confiar e me arrepender, do que duvidar e me arrepender.", author: "Kirito Kirigaya" },
            { text: "Não conte com o arrependimento. Ele vem tarde demais.", author: "Kratos" },
            { text: "O amor é a única coisa que somos capazes de perceber que transcende as dimensões do tempo e do espaço.", author: "Amelia Brand" },
            { text: "Em todo o tempo em que estivemos juntos, eu nunca quis estar em nenhum outro lugar.", author: "Joel Miller" },
            { text: "Ninguém pode nos dizer quem somos. Nós mesmos decidimos o nosso destino.", author: "Markus" }
        ],
        BOOKS: [
            { title: "Corte de Espinhos e Rosas", author: "Sarah J. Maas", desc: "Feyre Archeron é uma caçadora. A pele de um lobo poderia trazer ouro o suficiente para alimentar sua família por um mês inteiro. Mas tirar a vida de uma criatura mágica tem um custo alto, e Feyre acabou de matar o lobo errado.", cover: "https://m.media-amazon.com/images/I/91-HZzQ3naL._SY342_.jpg" },
            { title: "Quarta Asa", author: "Rebecca Yarros", desc: "Em Quarta Asa, conhecemos Violet Sorrengail, uma jovem destinada a lutar pela sobrevivência em universo onde coragem, poder e desejo se entrelaçam em meio a dragões, batalhas e segredos que podem mudar tudo.", cover: "https://m.media-amazon.com/images/I/61rNwZ710JL._SY342_.jpg" },
            { title: "Helena", author: "Machado de Assis", desc: "Narrado em terceira pessoa, este romance machadiano ambientado durante o século XIX traduz as surpresas e desgraças de um amor proibido.", cover: "https://m.media-amazon.com/images/I/61KDbIA7t6L._SY342_.jpg" },
            { title: "Hamlet", author: "William Shakespeare", desc: "Neste clássico da literatura mundial, um jovem príncipe se reúne com o fantasma de seu pai, que alega que seu próprio irmão, agora casado com sua viúva, o assassinou.", cover: "https://m.media-amazon.com/images/I/41FcApYkpIL._SY445_SX342_ControlCacheEqualizer_.jpg" },
            { title: "Suicidas", author: "Raphael Montes", desc: "Conhecemos a história de Alê e seus colegas, jovens da elite carioca encontrados mortos no porão do sítio em condições misteriosas que indicam que os nove amigos participaram de um perigoso e fatídico jogo de roleta russa.", cover: "https://m.media-amazon.com/images/I/81XqiNjr5OL._SY342_.jpg" },
            { title: "O Retrato de Dorian Gray", author: "Oscar Wilde", desc: "Um personagem que leva uma vida dupla, mantendo uma aparência de virtude enquanto se entrega ao hedonismo mais extremado.", cover: "https://m.media-amazon.com/images/I/51REmr5NmnL._SY342_.jpg" },
            { title: "Império do Vampiro", author: "Jay Kristoff", desc: "Já se passaram 27 longos anos desde o último nascer do sol. Por quase três décadas, os vampiros travaram uma guerra contra a humanidade, gora, apenas algumas pequenas faíscas de luz perduram em um mar de escuridão. Gabriel de León, metade humano e metade monstro, é o último Santo de Prata e narra a historia.", cover: "https://m.media-amazon.com/images/I/51cZ0MS4hmL._SY445_SX342_ControlCacheEqualizer_.jpg" }
        ],
        MOVIES: [
            { title: "O amor move ondas", year: "2022", stars: 5, date: "25 de Dezembro de 2025 ", quote: "Onde tudo começou. Um bom filme que se tornou eterno para nós por ser o primeiro da nossa história assistida a dois.", cover: "https://images.justwatch.com/backdrop/301015537/s1920/pod-wiatr-2022.avif" },
            { title: "Nosso último verão", year: "2019", stars: 5, date: "26 de Dezembro de 2025 ", quote: "Onde o tempo parece parar e o verão se torna eterno. Um filme que reflete a leveza e a cumplicidade de estarmos construindo o nosso próprio caminho juntos.", cover: "https://images.justwatch.com/backdrop/132410010/s1920/the-last-summer.avif" },
            { title: "O par perfeito", year: "2019", stars: 5, date: "29 de Dezembro de 2025 ", quote: "Um lembrete de que pares perfeitos não precisam de grandes produções, apenas da pessoa certa. E um lembrete de que a minha pessoa certa é você!", cover: "https://images.justwatch.com/backdrop/240743378/s1920/the-perfect-date.avif" },
            { title: "Dançarina perfeita", year: "2020", stars: 5, date: "01 de Janeiro de 2026 ", quote: "O primeiro filme do ano. Entre passos de dança e risadas, mergulhamos em conversas profundas sobre perdas e vida.", cover: "https://images.justwatch.com/backdrop/194636335/s1920/work-it.avif" },
            { title: "A caminho do verão", year: "2022", stars: 5, date: "03 de Janeiro de 2026 ", quote: "Para quem sempre viveu nas sombras, você é o meu amanhecer. Mais um bom capítulo escrito na nossa historia. Gosto muito de você!", cover: "https://images.justwatch.com/backdrop/274890593/s1920/along-for-the-ride.avif" },
            { title: "Como treinar o seu dragão", year: "2010", stars: 5, date: "13 de Janeiro de 2026 ", quote: "Que sorte a minha poder assistir ao primeiro filme da minha franquia de animação favorita, agora com minha pessoa favorita.", cover: "https://images.justwatch.com/backdrop/246799588/s1920/como-treinar-o-seu-dragao.avif" },
            { title: "Como treinar o seu dragão 2", year: "2014", stars: 5, date: "16 de Janeiro de 2026 ", quote: "A sorte se repete. Agora, com o melhor filme da franquia, continuo a saga com minha pessoa favorita. Você torna tudo mais especial.", cover: "https://images.justwatch.com/backdrop/301786713/s1920/drachenzahmen-leicht-gemacht-2.avif" }
        ],
        SERIES: [
            { title: "Outlander", year: "2014", stars: 5, date: "27 de Dezembro de 2025", progress: "T1 : E1", cover: "https://images.justwatch.com/backdrop/305389828/s1920/outlander.avif" },
            { title: "The Vampire Diaries", year: "2009", stars: 5, date: "11 de Janeiro de 2026", progress: "T1 : E1", cover: "https://images.justwatch.com/backdrop/178039414/s1920/diarios-de-um-vampiro.avif" },
            { title: "A Knight of the Seven Kingdoms", year: "2026", stars: 5, date: "22 de Janeiro de 2026", progress: "T1 : E1", cover: "https://images.justwatch.com/backdrop/337757110/s1920/a-knight-of-the-seven-kingdoms-the-hedge-knight.avif" }
        ],
        ANIMES: [
            { title: "Overlord", year: "2015", stars: 5, date: "06 de Janeiro de 2026", progress: "T1 : E12", cover: "https://images.justwatch.com/backdrop/339630570/s1920/temporada-1.avif" }
        ],
        MUSIC: [
            { t: "In my head", a: "Bedroom" }, { t: "505", a: "Arctic Monkeys" },
            { t: "Black", a: "Pearl Jam" }, { t: "Sweater Weather", a: "The Neighbourhood" },
            { t: "L.L.L.", a: "MYTH & ROID" }, { t: "Sad Girl", a: "Lana Del Rey" },
            { t: "Wicked Game", a: "Chris Isaak" }, { t: "Lose Control", a: "Teddy Swims" },
            { t: "Mockingbird", a: "Eminem" }, { t: "Softcore", a: "The Neighbourhood" },
            { t: "Lonely day", a: "System of a down" }, { t: "RU Mine?", a: "Arctic Monkeys" },
            { t: "One Last Breath", a: "Creed" }, { t: "Wires", a: "The Neighbourhood" },
            { t: "Demons", a: "Imagine Dragons" }, { t: "Meddle About", a: "Chase Atlantic" },
            { t: "Don't Cry", a: "Guns N' Roses" }, { t: "No. 1 Party Anthem", a: "Arctic Monkeys" },
            { t: "Shut up My Moms Calling", a: "Hotel Ugly" }, { t: "Daddy Issues", a: "The Neighbourhood" },
            { t: "Is There Someone Else?", a: "The Weeknd" }, { t: "West Coast", a: "Lana Del Rey" },
            { t: "Snuff", a: "Corey Taylor" }, { t: "Bother", a: "Stone Sour" },
            { t: "Like a Stone", a: "Audioslave" }, { t: "I'll Keep Coming", a: "Low Roar" },
            { t: "Imperfect", a: "Stone Sour" }, { t: "True Faith", a: "Ashley Johnson" },
            { t: "Home", a: "Corey Taylor" }, { t: "Taciturn", a: "Stone Sour" },
            { t: "To the Wilder feat. Elle Fanning", a: "WOODKID" }, { t: "Raindrops Keep Falling on my Head", a: "B J Thomas" },
            { t: "Soldier Side", a: "System of a Down" }, { t: "Don't Be so Serious", a: "Low Roar" },
            { t: "Through the Valley", a: "Ashley Johnson" }, { t: "Future Days", a: "Troy Baker" },
            { t: "Put It on Me", a: "Matt Maeson" }, { t: "Red Hearts", a: "Marlon Funaki" },
            { t: "Love is a Bitch", a: "Two Feet" }, { t: "Nervous", a: "The Neighbourhood" },
            { t: "Butterflies", a: "Abe Parker" }, { t: "Flawless", a: "The Neighbourhood" },
            { t: "Moth To a Flame", a: "The Weeknd" }, { t: "Until Now", a: "Abe Parker" },
            { t: "Something in The Way", a: "Nirvana" }, { t: "Fire In My Head", a: "Two Feet" },
            { t: "My Life Is Going On", a: "Cecilia Krull" }, { t: "Cloud", a: "Elias" },
            { t: "Last First Kiss", a: "Abe Parker" }, { t: "Sleep On The Floor", a: "The Lumineers" },
            { t: "Exile (feat. Bon Iver)", a: "Taylor Swift" }, { t: "Crazy About You", a: "Abe Parker" },
            { t: "Forever and a day", a: "Abe Parker" }, { t: "Sitting, Waiting, Wishing", a: "Jack Johnson" }
        ]
    };

    let currentMovieIdx = 0;
    let currentSeriesIdx = 0;
    let currentAnimeIdx = 0;

    const renderStars = (containerId, rating) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'material-symbols-outlined';
            star.textContent = 'star';
            star.style.fontVariationSettings = (i < rating) ? "'FILL' 1" : "'FILL' 0";
            container.appendChild(star);
        }
    };

    const updateMovieUI = (idx) => {
        const m = CONFIG.MOVIES[idx];
        document.getElementById('movie-title').textContent = m.title;
        document.getElementById('movie-year').textContent = m.year;
        document.getElementById('movie-watch-date').textContent = m.date;
        document.getElementById('movie-quote').textContent = `"${m.quote}"`;
        document.getElementById('movie-cover').src = m.cover;
        renderStars('movie-stars', m.stars);
    };

    const updateSeriesUI = (idx) => {
        const s = CONFIG.SERIES[idx];
        document.getElementById('series-title').textContent = s.title;
        document.getElementById('series-year').textContent = s.year;
        document.getElementById('series-watch-date').textContent = s.date;
        document.getElementById('series-progress').textContent = s.progress;
        document.getElementById('series-cover').src = s.cover;
        renderStars('series-stars', s.stars);
    };

    const updateAnimeUI = (idx) => {
        const a = CONFIG.ANIMES[idx];
        document.getElementById('anime-title').textContent = a.title;
        document.getElementById('anime-year').textContent = a.year;
        document.getElementById('anime-watch-date').textContent = a.date;
        document.getElementById('anime-progress').textContent = a.progress;
        document.getElementById('anime-cover').src = a.cover;
        renderStars('anime-stars', a.stars);
    };

    const updateUI = () => {
        const now = new Date();
        const hour = now.getHours();
        let saudacao = hour >= 5 && hour < 12 ? "Bom dia, meu bem" : hour >= 12 && hour < 18 ? "Boa tarde, meu bem" : "Boa noite, meu bem";
        document.getElementById('greeting-text').innerHTML = `${saudacao} <span id="heart-icon">🤍</span>`;
        document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        const q = getShuffledItem(CONFIG.QUOTES);
        document.getElementById('quote-text').textContent = `"${q.text}"`;
        document.getElementById('quote-author').textContent = q.author;
        const b = getShuffledItem(CONFIG.BOOKS);
        document.getElementById('book-title').textContent = b.title;
        document.getElementById('book-author').textContent = b.author;
        document.getElementById('book-desc').textContent = b.desc;
        document.getElementById('book-cover').src = b.cover;
        updateMovieUI(currentMovieIdx);
        updateSeriesUI(currentSeriesIdx);
        updateAnimeUI(currentAnimeIdx);
        const music1 = getShuffledItem(CONFIG.MUSIC, 0, 2);
        const music2 = getShuffledItem(CONFIG.MUSIC, 1, 2);
        [music1, music2].forEach((s, i) => {
            const idx = i + 1;
            document.getElementById(`music-title-${idx}`).textContent = s.t;
            document.getElementById(`music-artist-${idx}`).textContent = s.a;
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(s.t + ' ' + s.a)}&entity=musicTrack&limit=1`)
                .then(r => r.json()).then(d => {
                    if (d.results[0]) {
                        document.getElementById(`music-img-${idx}`).src = d.results[0].artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
                        document.getElementById(`music-link-${idx}`).href = d.results[0].trackViewUrl;
                    }
                });
        });
    };

    const fetchWeather = (city, tempId, descId) => {
        fetch(`https://wttr.in/${city}?format=j1`)
            .then(r => r.json()).then(d => {
                document.getElementById(tempId).textContent = `${d.current_condition[0].temp_C}°`;
                document.getElementById(descId).textContent = d.current_condition[0].lang_pt[0].value;
            });
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateUI();
        fetchWeather('Manaus', 'temp-manaus', 'desc-manaus');
        fetchWeather('Bambui', 'temp-bambui', 'desc-bambui');
        document.getElementById('next-movie').onclick = () => { currentMovieIdx = (currentMovieIdx + 1) % CONFIG.MOVIES.length; updateMovieUI(currentMovieIdx); };
        document.getElementById('prev-movie').onclick = () => { currentMovieIdx = (currentMovieIdx - 1 + CONFIG.MOVIES.length) % CONFIG.MOVIES.length; updateMovieUI(currentMovieIdx); };
        document.getElementById('next-series').onclick = () => { currentSeriesIdx = (currentSeriesIdx + 1) % CONFIG.SERIES.length; updateSeriesUI(currentSeriesIdx); };
        document.getElementById('prev-series').onclick = () => { currentSeriesIdx = (currentSeriesIdx - 1 + CONFIG.SERIES.length) % CONFIG.SERIES.length; updateSeriesUI(currentSeriesIdx); };
        document.getElementById('next-anime').onclick = () => { currentAnimeIdx = (currentAnimeIdx + 1) % CONFIG.ANIMES.length; updateAnimeUI(currentAnimeIdx); };
        document.getElementById('prev-anime').onclick = () => { currentAnimeIdx = (currentAnimeIdx - 1 + CONFIG.ANIMES.length) % CONFIG.ANIMES.length; updateAnimeUI(currentAnimeIdx); };
    });
})();


