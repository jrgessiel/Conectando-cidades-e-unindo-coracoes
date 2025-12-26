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
        if (onlineCount >= 2) {
            heart.classList.add('pulse-heart');
            heart.textContent = '❤️';
        } else {
            heart.classList.remove('pulse-heart');
            heart.textContent = '🤍';
        }
    }
});

(function () {
    "use-strict";

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
            { text: "Você não pode ser um homem ruim e esperar que coisas boas aconteçam.", author: "Arthur Morgan" }
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
            { title: "O amor move ondas", year: "2022", stars: 5, date: "25 de Dezembro de 2025 ", quote: "Onde tudo começou. Um bom filme que se tornou eterno para nós por ser o primeiro da nossa história assistida a dois.", cover: "https://images.justwatch.com/poster/263410867/s166/pod-wiatr-2022.avif" },
            { title: "Nosso último verão", year: "2019", stars: 5, date: "26 de Dezembro de 2025 ", quote: "Onde o tempo parece parar e o verão se torna eterno. Um filme que reflete a leveza e a cumplicidade de estarmos construindo o nosso próprio caminho juntos.", cover: "https://images.justwatch.com/poster/127004339/s166/the-last-summer.avif" }
        ],
        MUSIC: [
            [{ t: "Sweater Weather", a: "The Neighbourhood" }, { t: "Softcore", a: "The Neighbourhood" }],
            [{ t: "Wires", a: "The Neighbourhood" }, { t: "505", a: "Arctic Monkeys" }],
            [{ t: "Meddle About", a: "Chase Atlantic" }, { t: "Don't Cry", a: "Guns N' Roses" }],
            [{ t: "No. 1 Party Anthem", a: "Arctic Monkeys" }, { t: "Sad Girl", a: "Lana Del Rey" }],
            [{ t: "Shut up My Moms Calling", a: "Hotel Ugly" }, { t: "RU Mine?", a: "Arctic Monkeys" }],
            [{ t: "Daddy Issues", a: "The Neighbourhood" }, { t: "Is There Someone Else?", a: "The Weeknd" }],
            [{ t: "Lose Control", a: "Teddy Swims" }, { t: "West Coast", a: "Lana Del Rey" }]
        ]
    };

    let currentMovieIdx = 0;

    const updateMovieUI = (idx) => {
        const movie = CONFIG.MOVIES[idx];
        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-year').textContent = movie.year;
        document.getElementById('movie-watch-date').textContent = movie.date;
        document.getElementById('movie-quote').textContent = `"${movie.quote}"`;
        document.getElementById('movie-cover').src = movie.cover;

        const starsContainer = document.getElementById('movie-stars');
        starsContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'material-symbols-outlined';
            star.textContent = 'star';
            star.style.fontVariationSettings = (i < movie.stars) ? "'FILL' 1" : "'FILL' 0";
            starsContainer.appendChild(star);
        }
    };

    const updateUI = () => {
        const now = new Date();
        const hour = now.getHours();
        const dayIdx = now.getDay();

        const greetingElement = document.getElementById('greeting-text');
        if (greetingElement) {
            let saudacao = hour >= 5 && hour < 12 ? "Bom dia, meu bem" : hour >= 12 && hour < 18 ? "Boa tarde, meu bem" : "Boa noite, meu bem";
            greetingElement.innerHTML = `${saudacao} <span id="heart-icon">🤍</span>`;
        }

        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        }

        const quote = CONFIG.QUOTES[dayIdx];
        document.getElementById('quote-text').textContent = `"${quote.text}"`;
        document.getElementById('quote-author').textContent = quote.author;

        const book = CONFIG.BOOKS[dayIdx];
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = book.author;
        document.getElementById('book-desc').textContent = book.desc;
        document.getElementById('book-cover').src = book.cover;

        updateMovieUI(currentMovieIdx);

        CONFIG.MUSIC[dayIdx].forEach((s, i) => {
            const idx = i + 1;
            const titleEl = document.getElementById(`music-title-${idx}`);
            const artistEl = document.getElementById(`music-artist-${idx}`);
            const imgEl = document.getElementById(`music-img-${idx}`);
            const linkEl = document.getElementById(`music-link-${idx}`);

            if (titleEl) titleEl.textContent = s.t;
            if (artistEl) artistEl.textContent = s.a;

            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(s.t + ' ' + s.a)}&entity=musicTrack&limit=1`)
                .then(r => r.json())
                .then(d => {
                    if (d.results[0]) {
                        const highResImg = d.results[0].artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
                        if (imgEl) imgEl.src = highResImg;
                        if (linkEl) linkEl.href = d.results[0].trackViewUrl;
                    }
                })
                .catch(() => { if (imgEl) imgEl.src = 'https://via.placeholder.com/600'; });
        });
    };

    const fetchWeather = (city, tempId, descId) => {
        fetch(`https://wttr.in/${city}?format=j1`)
            .then(r => r.json())
            .then(d => {
                const temp = d.current_condition[0].temp_C;
                const desc = d.current_condition[0].lang_pt[0].value;
                document.getElementById(tempId).textContent = `${temp}°`;
                document.getElementById(descId).textContent = desc;
            })
            .catch(() => { document.getElementById(tempId).textContent = "--°"; });
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateUI();
        fetchWeather('Manaus', 'temp-manaus', 'desc-manaus');
        fetchWeather('Bambui', 'temp-bambui', 'desc-bambui');

        document.getElementById('next-movie').onclick = () => {
            currentMovieIdx = (currentMovieIdx + 1) % CONFIG.MOVIES.length;
            updateMovieUI(currentMovieIdx);
        };
        document.getElementById('prev-movie').onclick = () => {
            currentMovieIdx = (currentMovieIdx - 1 + CONFIG.MOVIES.length) % CONFIG.MOVIES.length;
            updateMovieUI(currentMovieIdx);
        };
    });
})();
