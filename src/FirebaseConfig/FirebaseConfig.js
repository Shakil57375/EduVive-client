// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAfawQWIxHRQiiJXIzPKgIdSGjFGoM12o",
  authDomain: "collage-adminst.firebaseapp.com",
  projectId: "collage-adminst",
  storageBucket: "collage-adminst.appspot.com",
  messagingSenderId: "808215570219",
  appId: "1:808215570219:web:98306a4d998e3362bec76e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app