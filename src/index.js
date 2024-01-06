/* === Imports === */



import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
 } from "firebase/auth";

/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "",
    authDomain: "moody-51a4c.firebaseapp.com",
    projectId: "moody-51a4c",
    storageBucket: "moody-51a4c.appspot.com",
    messagingSenderId: "269670080745",
    appId: "1:269670080745:web:9fb169fa410fc8d3811078"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);






/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")


const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {

    
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value

    

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        showLoggedInView()
        // ...
    })
    .catch((error) => {
        console.log(error.message)
    });
}

function authCreateAccountWithEmail() {
    
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        showLoggedInView()
    })
        .catch((error) => {
            console.error("Firebase code has some type of error");
            // ..
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}