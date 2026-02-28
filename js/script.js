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
        
        const dayOfYear = getDayOfYear();
        const globalIndex = (dayOfYear * step) + offset;
        
        let indices = Array.from(array.keys());
        
        let seed = array.length * 42; 

        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom(seed + i) * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        return array[indices[globalIndex % indices.length]];
    };

    const CONFIG = {
        DATES: {
            her: { month: 7, day: 12 },
            his: { month: 5, day: 27 },
            meeting: { year: 2025, month: 11, day: 22 }
        },
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
            { title: "As Leis da Termodinâmica", year: "2018", stars: 5, date: "18 de Fevereiro de 2026 ", quote: "Eles podem até tentar explicar a atração e o caos do universo, mas nenhuma ciência explica a sorte que é estarmos orbitando um ao outro.", cover: "https://images.justwatch.com/backdrop/7295266/s1440/the-laws-of-thermodynamics.avif" }
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
            { t: "Like a Stone", a: "Audioslave" }, { t: "Tennessee Whiskey", a: "Chris Stapleton" },
            { t: "Soldier Side", a: "System of a Down" }, { t: "Exile (feat. Bon Iver)", a: "Taylor Swift" },
            { t: "Mockingbird", a: "Eminem" }, { t: "Snuff", a: "Corey Taylor" },
            { t: "No. 1 Party Anthem", a: "Arctic Monkeys" }, { t: "Lose Control", a: "Teddy Swims" },
            { t: "Disfruto", a: "Carla Morrison" }, { t: "Broken", a: "Seether" },
            { t: "Outra Vida", a: "Armandinho" }, { t: "West Coast", a: "Lana Del Rey" },
            { t: "Flawless", a: "The Neighbourhood" }, { t: "Home", a: "Corey Taylor" },
            { t: "Lost in the fire", a: "The Weeknd" }, { t: "Something in The Way", a: "Nirvana" },
            { t: "Wet dreams", a: "Artemas" }, { t: "Love is a Bitch", a: "Two Feet" },
            { t: "Over my head", a: "updog" }, { t: "True Faith", a: "Ashley Johnson" },
            { t: "In my head", a: "Bedroom" }, { t: "Imperfect", a: "Stone Sour" },
            { t: "505", a: "Arctic Monkeys" }, { t: "Is There Someone Else?", a: "The Weeknd" },
            { t: "Apocalypse", a: "Cigarettes After Sex" }, { t: "Future Days", a: "Troy Baker" },
            { t: "3 Libras", a: "A Perfect Circle" }, { t: "Wires", a: "The Neighbourhood" },
            { t: "Cloud", a: "Elias" }, { t: "K.", a: "Cigarettes After Sex" },
            { t: "Alice in Chains", a: "Nutshell" }, { t: "Chão de Giz", a: "Zé Ramalho" },
            { t: "One Last Breath", a: "Creed" }, { t: "Nervous", a: "The Neighbourhood" },
            { t: "Butterflies", a: "Abe Parker" }, { t: "Te Regalo", a: "Carla Morrison" },
            { t: "Last First Kiss", a: "Abe Parker" }, { t: "Na Sua Estante", a: "Pitty" },
            { t: "Demons", a: "Imagine Dragons" }, { t: "I'll Keep Coming", a: "Low Roar" },
            { t: "Red Hearts", a: "Marlon Funaki" }, { t: "Animals", a: "Maroon 5" },
            { t: "Eres Tú", a: "Carla Morrison" }, { t: "Meddle About", a: "Chase Atlantic" },
            { t: "Forever and a day", a: "Abe Parker" }, { t: "Don't Be so Serious", a: "Low Roar" },
            { t: "Imposter Syndrome", a: "Abe Parker" }, { t: "Through the Valley", a: "Ashley Johnson" },
            { t: "A Different Age", a: "Current Joys" }, { t: "Put It on Me", a: "Matt Maeson" },
            { t: "Moth To a Flame", a: "The Weeknd" }, { t: "My Love Mine All Mine", a: "Mitski" },
            { t: "Palavras Ao Vento", a: "Cássia Eller" }, { t: "To the Wilder feat. Elle Fanning", a: "WOODKID" },
            { t: "Who Do You Want", a: "Ex Habit" }, { t: "Raindrops Keep Falling on my Head", a: "B J Thomas" },
            { t: "Lonely day", a: "System of a down" }, { t: "Call Out My Name", a: "The Weeknd" },
            { t: "Black", a: "Pearl Jam" }, { t: "My Life Is Going On", a: "Cecilia Krull" },
            { t: "The Less I Know The Better", a: "Tame Impala" }, { t: "Pink Bathwater", a: "Favourite Daughter" },
            { t: "Vermillion", a: "Slipknot" }, { t: "Sleep On The Floor", a: "The Lumineers" },
            { t: "Until Now", a: "Abe Parker" }, { t: "Devotion", a: "Montell Fish" },
            { t: "Ainda Gosto Dela", a: "Skank" }, { t: "Crazy About You", a: "Abe Parker" },
            { t: "Daddy Issues", a: "The Neighbourhood" }, { t: "When I R.I.P.", a: "Labrinth" },
            { t: "Compartir", a: "Carla Morrison" }, { t: "Blue Eyes", a: "Abe Parker" },
            { t: "W.D.Y.W.F.M?", a: "The Neighbourhood" }, { t: "Just want u to feel something", a: "Artemas" },
            { t: "Cherry Wine", a: "Hozier" }, { t: "One More Night", a: "Maroon 5" },
            { t: "RU Mine?", a: "Arctic Monkeys" }, { t: "Você me faz tão bem", a: "Detonautas" },
            { t: "Cage the Elephant", a: "Cigarette Daydreams" }, { t: "Don't Cry", a: "Guns N' Roses" },
            { t: "Crying Lightning", a: "Arctic Monkeys" }, { t: "The Night We Met", a: "Lord Huron" },
            { t: "Bother", a: "Stone Sour" }, { t: "Olhos Certos", a: "Detonautas" },
            { t: "Sad Girl", a: "Lana Del Rey" }, { t: "Taciturn", a: "Stone Sour" },
            { t: "Wicked Game", a: "Chris Isaak" }, { t: "Tempo Perdido", a: "Legião Urbana" },
            { t: "Sitting, Waiting, Wishing", a: "Jack Johnson" }, { t: "Shut up My Moms Calling", a: "Hotel Ugly" },
            { t: "Self Sabotage", a: "Abe Parker" }, { t: "Become The Warm Jets", a: "Current Joys" },
            { t: "Do It For Me", a: "Rosenfeld" }, { t: "L.L.L.", a: "MYTH & ROID" },
            { t: "Radio/Video", a: "System Of A Down" }, { t: "Fire In My Head", a: "Two Feet" },
            { t: "Heartburn", a: "Wafia" }, { t: "The Color Violet", a: "Tory Lanez" },
            { t: "Sweater Weather", a: "The Neighbourhood" }, { t: "Softcore", a: "The Neighbourhood" }
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
