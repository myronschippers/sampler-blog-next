// For Firebase Configurations
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD2vUpU-4w7ExNuP5sr_AHTBH20k6fiRVI',
  authDomain: 'sampler-box.firebaseapp.com',
  projectId: 'sampler-box',
  storageBucket: 'sampler-box.appspot.com',
  messagingSenderId: '139546217173',
  appId: '1:139546217173:web:2c77b39067d847d4c6305c',
  measurementId: 'G-TR5F8EBFCT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const authSignInWithPopup = signInWithPopup;
export const firestore = getFirestore(app);
export const storage = getStorage(app);
