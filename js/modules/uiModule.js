export class UIModule {
    setCurrentUser(user) {
        this.currentUser = user;
    }

    updateTogetherStatus(isTogether) {
        const heart = document.getElementById('heart-icon');
        if (heart) {
            heart.textContent = isTogether ? '❤️' : '🤍';
            heart.classList.toggle('pulse-heart', isTogether);
        }
    }

    attachEventListeners(app) {
        document.querySelectorAll('.btn-action').forEach((btn, i) => {
            btn.addEventListener('click', () => app.mascot.handleAction(i));
        });
    }

    handleStreamUpdate(data) {
        const container = document.getElementById('stream-container');
        if (!container) return;

        if (!data || !data.isActive) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        container.classList.toggle('video-banner--offline', !data.isOnline);

        const titleEl = document.getElementById('stream-title');
        if (titleEl) titleEl.textContent = (data.isOnline ? 'AO VIVO: ' : 'OFFLINE: ') + (data.title || 'Transmissão');

        const overlay = document.getElementById('video-overlay');
        const wrapper = document.getElementById('video-wrapper');

        if (overlay && wrapper && data.isOnline) {
            overlay.onclick = () => {
                overlay.style.display = 'none';
                wrapper.innerHTML = `<iframe src="${data.url}" allow="autoplay; camera; microphone; fullscreen" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe>`;
            };
        }
    }
}