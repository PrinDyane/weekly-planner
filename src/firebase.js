import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyyHoV67mKWztqJoMYAg8_ihB-1E868hc",
    authDomain: "planner-ab6ef.firebaseapp.com",
    projectId: "planner-ab6ef",
    storageBucket: "planner-ab6ef.firebasestorage.app",
    messagingSenderId: "1093765856264",
    appId: "1:1093765856264:web:ecfec0fa03fa121b1ba5bd"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider (); 
  const db= getFirestore(app);

  export {auth, provider, db}