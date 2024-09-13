import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyC9haWNDnUdr2_lqhITGh0PRfeE67wOJ0M",
    authDomain: "deakin-web-app-81d23.firebaseapp.com",
    projectId: "deakin-web-app-81d23",
    storageBucket: "deakin-web-app-81d23.appspot.com",
    messagingSenderId: "1064913115250",
    appId: "1:1064913115250:web:0bd5f694c971124749caeb",
    measurementId: "G-TF5KG7P20R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// Function to create user document from Auth
export const createUserDocFromAuth = async (userAuth,additionalInformation ={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); // Assuming 'users' is your collection
    const userSnapshot = await getDoc(userDocRef);

    // If the user document doesn't exist, create it
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth; // Destructuring displayName and email
        const createdAt = new Date(); // Getting the current date

        try {
            await setDoc(userDocRef, {
                displayName, // Correct spelling
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error in creating user document:', error.message);
        }
    }

    return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password)
}
export const signinAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password)
}