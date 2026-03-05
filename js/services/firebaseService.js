import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, update, onDisconnect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { FIREBASE_CONFIG } from "../config/firebaseConfig.js";

export class FirebaseService {
    constructor() {
        this.app = initializeApp(FIREBASE_CONFIG);
        this.db = getDatabase(this.app);
    }

    async setPresence(user) {
        if (user === 'visitante') return;
        const presenceRef = ref(this.db, `online/${user}_${Math.random().toString(36).substring(2, 5)}`);
        await set(presenceRef, true);
        onDisconnect(presenceRef).remove();
    }

    onOnlineChange(callback) {
        onValue(ref(this.db, 'online/'), snapshot => callback(snapshot.size >= 2));
    }

    onMascotChange(callback) {
        onValue(ref(this.db, 'mascot/'), snapshot => callback(snapshot.val()));
    }

    onStreamChange(callback) {
        onValue(ref(this.db, 'stream/'), snapshot => callback(snapshot.val()));
    }

    async updateMascot(data) {
        await update(ref(this.db, 'mascot'), data);
    }
}