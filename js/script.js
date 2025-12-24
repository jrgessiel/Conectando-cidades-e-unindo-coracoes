(function () {
    "use-strict";

    const CONFIG = {
        DATES: {
            dela: { month: 7, day: 12 },
            dele: { month: 5, day: 27 },
            encontro: { year: 2025, month: 11, day: 22 }
        },
        QUOTES: [
            { text: "Meu amor é profundo: quanto mais te dou, mais tenho.", author: "William Shakespeare" },
            { text: "Em algum lugar, algo incrível está esperando para ser descoberto.", author: "Carl Sagan" },
            { text: "Depois de tudo o que passamos juntos. De tudo o que eu fiz. Não pode ser em vão.", author: "Ellie Miller" },
            { text: "Mesmo na escuridão, eu te encontraria.", author: "Sarah J. Maas" },
            { text: "A única maneira de livrar-se de uma tentação é ceder a ela.", author: "Oscar Wild" },
            { text: "É um amor pobre aquele que se pode medir.", author: "William Shakespeare" },
            { text: "Você não pode ser um homem ruim e esperar que coisas boas aconteçam com você", author: "Arthur Morgan" }
        ],
        BOOKS: [
            {
                title: "Corte de Espinhos e Rosas", author: "Sarah J. Maas",
                desc: "Feyre Archeron é uma caçadora. A pele de um lobo poderia trazer ouro o suficiente para alimentar sua família por um mês inteiro. Mas tirar a vida de uma criatura mágica tem um custo alto, e Feyre acabou de matar o lobo errado.",
                cover: "https://m.media-amazon.com/images/I/91-HZzQ3naL._SY342_.jpg"
            },

            {
                title: "Quarta Asa", author: "Rebecca Yarros",
                desc: "Em Quarta Asa, conhecemos Violet Sorrengail, uma jovem destinada a lutar pela sobrevivência em universo onde coragem, poder e desejo se entrelaçam em meio a dragões, batalhas e segredos que podem mudar tudo.",
                cover: "https://m.media-amazon.com/images/I/61rNwZ710JL._SY342_.jpg"
            },

            {
                title: "Helena", author: "Machado de Assis",
                desc: "Narrado em terceira pessoa, este romance machadiano ambientado durante o século XIX traduz as surpresas e desgraças de um amor proibido.",
                cover: "https://m.media-amazon.com/images/I/61KDbIA7t6L._SY342_.jpg"
            },

            {
                title: "Hamlet", author: "William Shakespeare",
                desc: "Neste clássico da literatura mundial, um jovem príncipe se reúne com o fantasma de seu pai, que alega que seu próprio irmão, agora casado com sua viúva, o assassinou.",
                cover: "https://m.media-amazon.com/images/I/41FcApYkpIL._SY445_SX342_ControlCacheEqualizer_.jpg"
            },

            {
                title: "Suicidas", author: "Raphael Montes",
                desc: "Conhecemos a história de Alê e seus colegas, jovens da elite carioca encontrados mortos no porão do sítio em condições misteriosas que indicam que os nove amigos participaram de um perigoso e fatídico jogo de roleta russa.",
                cover: "https://m.media-amazon.com/images/I/81XqiNjr5OL._SY342_.jpg"
            },

            {
                title: "O Retrato de Dorian Gray", author: "Oscar Wilde",
                desc: "Um personagem que leva uma vida dupla, mantendo uma aparência de virtude enquanto se entrega ao hedonismo mais extremado.",
                cover: "https://m.media-amazon.com/images/I/51REmr5NmnL._SY342_.jpg"
            },

            {
                title: "Império do Vampiro", author: "Jay Kristoff",
                desc: "Já se passaram 27 longos anos desde o último nascer do sol. Por quase três décadas, os vampiros travaram uma guerra contra a humanidade, gora, apenas algumas pequenas faíscas de luz perduram em um mar de escuridão. Gabriel de León, metade humano e metade monstro, é o último Santo de Prata e narra a historia.",
                cover: "https://m.media-amazon.com/images/I/51cZ0MS4hmL._SY445_SX342_ControlCacheEqualizer_.jpg"
            }
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

    const updateUI = () => {
        const now = new Date();
        const dayIdx = now.getDay();

        // Data e Saudação
        document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

        // Contagens
        const getDays = (m, d) => {
            let next = new Date(now.getFullYear(), m, d);
            if (next < now) next.setFullYear(now.getFullYear() + 1);
            return Math.ceil((next - now) / 86400000);
        };
        //document.getElementById('cd-ela').textContent = `Faltam ${getDays(CONFIG.DATES.dela.month, CONFIG.DATES.dela.day)} dias`;
        //document.getElementById('cd-ele').textContent = `Faltam ${getDays(CONFIG.DATES.dele.month, CONFIG.DATES.dele.day)} dias`;

        const meet = new Date(CONFIG.DATES.encontro.year, CONFIG.DATES.encontro.month, CONFIG.DATES.encontro.day);
        const diffDays = Math.ceil((meet - now) / 86400000);
        //document.getElementById('cd-encontro').textContent = diffDays > 0 ? `Faltam ${diffDays} dias` : `${Math.abs(diffDays)} dias de história`;

        // Conteúdo Diário
        document.getElementById('quote-text').textContent = `"${CONFIG.QUOTES[dayIdx].text}"`;
        document.getElementById('quote-author').textContent = CONFIG.QUOTES[dayIdx].author;

        const book = CONFIG.BOOKS[dayIdx];
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = book.author;
        document.getElementById('book-desc').textContent = book.desc;
        document.getElementById('book-cover').src = book.cover;

        // Músicas (iTunes Fetch)
        CONFIG.MUSIC[dayIdx].forEach((s, i) => {
            const idx = i + 1;
            document.getElementById(`music-title-${idx}`).textContent = s.t;
            document.getElementById(`music-artist-${idx}`).textContent = s.a;
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(s.t + ' ' + s.a)}&limit=1`)
                .then(r => r.json()).then(d => {
                    if (d.results[0]) document.getElementById(`music-img-${idx}`).src = d.results[0].artworkUrl100;
                });
        });
    };

    // Clima Simplificado (wttr.in)
    const fetchWeather = (city, tempId, descId) => {
        fetch(`https://wttr.in/${city}?format=j1`).then(r => r.json()).then(d => {
            document.getElementById(tempId).textContent = `${d.current_condition[0].temp_C}°`;
            document.getElementById(descId).textContent = d.current_condition[0].lang_pt[0].value;
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateUI();
        fetchWeather('Manaus', 'temp-manaus', 'desc-manaus');
        fetchWeather('Bambui', 'temp-bambui', 'desc-bambui');
    });
})();