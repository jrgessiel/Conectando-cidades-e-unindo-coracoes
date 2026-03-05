export const Utils = {
    clamp: (val, min = 0, max = 100) => Math.min(max, Math.max(min, val)),

    getDailyShuffledItem(array, offset = 0, step = 1) {
        if (!array?.length) return null;
        const diffInDays = Math.floor((Date.now() - new Date(2002, 5, 27)) / 86400000);
        const globalIndex = (diffInDays * step) + offset;

        const indices = Array.from(array.keys());
        const seed = 122227;

        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(this.predictableRandom(seed + i) * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return array[indices[globalIndex % indices.length]];
    },

    predictableRandom(x) {
        const s = Math.sin(x) * 10000;
        return s - Math.floor(s);
    }
};