import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi5biKu0TQ1ZQ5Hd-Jd2f0Uv55PP02JXM",
    authDomain: "seamless-knitting.firebaseapp.com",
    projectId: "seamless-knitting",
    storageBucket: "seamless-knitting.appspot.com",
    messagingSenderId: "540691986882",
    appId: "1:540691986882:web:d23b7bdc3d4880f1233e5b",
    measurementId: "G-2HLGVTQ2G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
