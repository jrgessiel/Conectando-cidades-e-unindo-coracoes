import { Utils } from '../utils/utils.js';

export class MusicService {
    constructor(musicData) {
        this.musicData = musicData;
        this.state = { currentAudio: null, currentButton: null };
    }

    async loadDailySongs() {
        const musicItems = document.querySelectorAll('.music-item');

        for (let i = 0; i < 2; i++) {
            const song = Utils.getDailyShuffledItem(this.musicData, i, 2);
            if (!song || !musicItems[i]) continue;

            const item = musicItems[i];
            item.querySelector('.music-item__name').textContent = song.title;
            item.querySelector('.music-item__artist').textContent = song.artist;

            try {
                const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(song.title + ' ' + song.artist)}&entity=musicTrack&limit=1`);
                const data = await res.json();

                if (data.results?.[0]) {
                    const track = data.results[0];
                    const coverUrl = track.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
                    item.querySelector('.music-item__cover').src = coverUrl;

                    const playBtn = item.querySelector('.music-item__play');
                    playBtn.onclick = (e) => this.handlePlayback(track.previewUrl, playBtn);
                }
            } catch (e) {
                console.warn('Erro ao buscar capa da música:', e);
            }
        }
    }

    handlePlayback(url, button) {
        if (this.state.currentAudio && this.state.currentAudio.src !== url) {
            this.state.currentAudio.pause();
            if (this.state.currentButton) this.state.currentButton.innerHTML = '<i class="ph ph-play-circle"></i>';
        }

        if (!this.state.currentAudio || this.state.currentAudio.src !== url) {
            this.state.currentAudio = new Audio(url);
            this.state.currentButton = button;

            this.state.currentAudio.addEventListener('ended', () => {
                if (this.state.currentButton) this.state.currentButton.innerHTML = '<i class="ph ph-play-circle"></i>';
            });
        }

        if (this.state.currentAudio.paused) {
            this.state.currentAudio.play();
            button.innerHTML = '<i class="ph-fill ph-pause-circle"></i>';
        } else {
            this.state.currentAudio.pause();
            button.innerHTML = '<i class="ph ph-play-circle"></i>';
        }
    }
}