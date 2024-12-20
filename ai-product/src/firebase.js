// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup ,signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    // Redirect to the Dashboard
    navigate("/Dashboard");
  } catch (error) {
    console.error(error);
  }
};

// Function to log out from Firebase
export const signOutFromGoogle = async (navigate) => {
  const auth = getAuth();
  try {
    await signOut(auth); // Sign out from Firebase
    console.log("User signed out successfully");
    // Optionally, navigate to login page after logout
    navigate("/");// Redirect to the login page (or use `navigate('/login')` if inside a component)
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};