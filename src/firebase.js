import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDc2s1zPG6JyjTDwDaATeRhVQWpSrw4sbQ",
  authDomain: "xbcad-data-b7275.firebaseapp.com",
  databaseURL: "https://xbcad-data-b7275-default-rtdb.firebaseio.com",
  projectId: "xbcad-data-b7275",
  storageBucket: "xbcad-data-b7275.appspot.com",
  messagingSenderId: "870459676652",
  appId: "1:870459676652:web:dfb44657fa184b026e52c9",
  measurementId: "G-CFKJV4QZPW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
