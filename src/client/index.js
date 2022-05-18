import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyBeW6uSzgdtlq_sxq6_YpTgDcZATEZnx5g",
  authDomain: "musica-biblioteca.firebaseapp.com",
  projectId: "musica-biblioteca",
  storageBucket: "musica-biblioteca.appspot.com",
  messagingSenderId: "163909557265",
  appId: "1:163909557265:web:80ecfff70f7d7d871f25b0"
}

export const app = initializeApp(config);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);