/* === Imports === */



import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
    updateProfile } from "firebase/auth";

/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "AIzaSyA_n4sDPvPUcasLUdN6fKwdqQuZ4DDFd1o",
    authDomain: "moody-51a4c.firebaseapp.com",
    projectId: "moody-51a4c",
    storageBucket: "moody-51a4c.appspot.com",
    messagingSenderId: "269670080745",
    appId: "1:269670080745:web:9fb169fa410fc8d3811078"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();







/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")


const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")
const signOutBtn = document.getElementById("sign-out-btn")
const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

const displayNameInputEl = document.getElementById("display-name-input")
const photoURLInputEl = document.getElementById("photo-url-input")
const updateProfileButtonEl = document.getElementById("update-profile-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutBtn.addEventListener("click", authSignOut)
updateProfileButtonEl.addEventListener("click", authUpdateProfile)

/* === Main Code === */



onAuthStateChanged(auth, (user) => {
        if (user) {
          showLoggedInView();
          showProfilePicture(userProfilePictureEl, user);
          showUserGreeting(userGreetingEl, user);
        } else {
          showLoggedOutView()
        }
});


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            
            console.log("Signed in with google successfully!")
            
        }).catch((error) => {
            console.error(error.message)
    });
}

function authSignInWithEmail() {

    
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value

    

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        clearAuthFields()
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
            clearAuthFields()
    })
        .catch((error) => {
            console.error("Firebase code has some type of error");
            // ..
    });
}

function authSignOut() {

    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.error(error.message)
      });
}





/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}

function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
    clearInputField(document.getElementById("email-input"))
    clearInputField(document.getElementById("password-input"))
}

function showProfilePicture(imageElement, user){
    if(user.photoURL){
        imageElement.src = user.photoURL
    }
    else{
        imageElement.src = "/images/Default.jpeg"
    }
}

function showUserGreeting(element, user){
    const displayName = user.displayName
    if(displayName){
        const userFirstName = displayName.split(" ")[0]
        element.innerText = (`Hey ${userFirstName}, how are you?`)
    }
    else{
        element.innerText = (`Hey friend, how are you?`)
    }
}

function authUpdateProfile() {
    updateProfile(auth.currentUser, {


        displayName: `${displayNameInputEl.value}`, photoURL: `${photoURLInputEl.value}`
      }).then(() => {
        console.log("Updated the display name and profile picture")
        // ...
      }).catch((error) => {
        console.log("error occurred!")
      });
}
