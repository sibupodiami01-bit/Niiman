import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


async function signup() {

    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(userCredential.user, {
            displayName: name
        });

        window.location.replace("login.html");

    } catch (error) {

        alert(error.message);

    }
}


async function login() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.replace("index.html");

    } catch (error) {

        alert(error.message);

    }
}


window.signup = signup;
window.login = login;
