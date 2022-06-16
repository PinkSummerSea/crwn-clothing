
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; 
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyv8Jl9dx47u3moru2El59kegcTnS84NM",
  authDomain: "crwn-clothing-16ea0.firebaseapp.com",
  projectId: "crwn-clothing-16ea0",
  storageBucket: "crwn-clothing-16ea0.appspot.com",
  messagingSenderId: "357998941319",
  appId: "1:357998941319:web:551f546b4fda4d8a165422"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      })
    } catch(error){
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef;
}