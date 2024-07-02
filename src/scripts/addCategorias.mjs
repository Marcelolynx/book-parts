import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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


const addCategorias = async (categorias) => {
  const categoriasRef = collection(db, 'categorias'); // Corrigir a referência para a coleção
  for (const categoria of categorias) {
    await addDoc(categoriasRef, { nome: categoria });
  }
};

const email = "marcelolynx@gmail.com"; // substitua pelo seu email
const password = "mco02jgp"; // substitua pela sua senha

signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    const categorias = [
      "Caregangem/Plásticos",
      "Chassi",
      "Elétrica",
      // adicione todas as suas categorias aqui
    ];

    return addCategorias(categorias);
  })
  .then(() => {
    console.log('Categorias adicionadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao adicionar categorias: ', error);
  });
