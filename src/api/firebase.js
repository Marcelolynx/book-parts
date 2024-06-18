import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCYZIBpDVFv1qPb8Tl52hpRfVFc2liMKc",
    authDomain: "motobook-9564c.firebaseapp.com",
    projectId: "motobook-9564c",
    storageBucket: "motobook-9564c.appspot.com",
    messagingSenderId: "308444558234",
    appId: "1:308444558234:web:948f724af51777ef8f0023",
    measurementId: "G-7HQY5590VS"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
