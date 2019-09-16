import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyCaSuwiNybQbbIAdccyUpb0muVrHn9UJmU",
    authDomain: "v-fire-c9a94.firebaseapp.com",
    databaseURL: "https://v-fire-c9a94.firebaseio.com",
    projectId: "v-fire-c9a94",
    storageBucket: "",
    messagingSenderId: "260175090611",
    appId: "1:260175090611:web:be35497c263577b7f371c6"
});

export const db = app.firestore();
