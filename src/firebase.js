import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    deleteDoc,
    increment,
    arrayUnion,
    arrayRemove,
    deleteField,
} from "firebase/firestore";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    listAll,
    uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBvaE-V-3RCJMBTHDNHGxZLTw2w1RRsxkQ",
    authDomain: "process-app-demo.firebaseapp.com",
    projectId: "process-app-demo",
    storageBucket: "process-app-demo.appspot.com",
    messagingSenderId: "181083184679",
    appId: "1:181083184679:web:618ed3e40bf6d89517f802",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//Firebase exports
export {
    getAuth,
    createUserWithEmailAndPassword,
    updateEmail,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    app,
    reauthenticateWithCredential,
    EmailAuthProvider,
};

//Firestore exports
export {
    db,
    doc,
    collection,
    setDoc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    where,
    query,
    onSnapshot,
    orderBy,
    deleteDoc,
    increment,
    arrayUnion,
    arrayRemove,
    deleteField,
};

//FirebaseStorage exports
export {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    listAll,
    uploadBytesResumable,
};
