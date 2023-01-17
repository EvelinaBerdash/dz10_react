import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAHKINfwQo1j-A2XlKJvg3C5Uj7fVa3tBU",
  authDomain: "reactdz9.firebaseapp.com",
  projectId: "reactdz9",
  storageBucket: "reactdz9.appspot.com",
  messagingSenderId: "613935258161",
  appId: "1:613935258161:web:1b3abd56af3bdd6c719310"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

export const signUp = async (email, password) => await createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signIn = async (email, password) => await signInWithEmailAndPassword(firebaseAuth, email, password)

export const logOut = async () => await signOut(firebaseAuth)

const db = getDatabase(app)

export const userRef = ref(db, 'user')
export const messagesRef = ref(db, 'messages')

export const getChatById = (chatId) => ref(db, `messages/${chatId}`)

export const getMessageListById = (chatId) => ref(db, `messages/${chatId}/messageList`)