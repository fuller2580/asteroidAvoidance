// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.firebaseAPI,
  authDomain: "asteroids-game-f1930.firebaseapp.com",
  projectId: "asteroids-game-f1930",
  storageBucket: "asteroids-game-f1930.appspot.com",
  messagingSenderId: "857492056916",
  appId: "1:857492056916:web:32497ce2887611f41876c1",
  measurementId: "G-10EJLE78C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);