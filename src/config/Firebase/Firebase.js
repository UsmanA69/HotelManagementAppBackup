import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  onChildAdded,
  child,
  ref,
  push,
  update,
  set,
  onValue,
  remove
} from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANVFhL0qYT6mleSiexlQw-Pz7ESNBBeVs",
  authDomain: "dashboardpractise-645fe.firebaseapp.com",
  projectId: "dashboardpractise-645fe",
  storageBucket: "dashboardpractise-645fe.appspot.com",
  messagingSenderId: "33489577919",
  appId: "1:33489577919:web:8576ec4c4b67894895e30a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  database,
  ref,
  set,
  onChildAdded,
  child,
  push,
  update,
  onValue,
  storage,
  remove
};
