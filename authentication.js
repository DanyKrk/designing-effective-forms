// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaGqA25-XiOdQwRALGO7i85t8n88-zmMM",
  authDomain: "tpflab4.firebaseapp.com",
  projectId: "tpflab4",
  storageBucket: "tpflab4.appspot.com",
  messagingSenderId: "680408778347",
  appId: "1:680408778347:web:9bbb8d14ea994d38e9d32e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const injectUserDataIntoForm = (user) => {
    document.querySelector('#firstName').value = user.displayName.split(' ')[0] || ''; // Pobierz imię użytkownika
    document.querySelector('#lastName').value = user.displayName.split(' ')[1] || ''; // Pobierz nazwisko użytkownika
    document.querySelector('#exampleInputEmail1').value = user.email || ''; // Pobierz email użytkownika
};

const userSignIn = async () => {
  signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log(user);    
      localStorage.setItem('user', JSON.stringify(user));
      injectUserDataIntoForm(user);
  }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`There was an error ${errorCode} with message ${errorMessage}`);
    })
};

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`There was an error ${errorCode} with message ${errorMessage}`);
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }
 })

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
 