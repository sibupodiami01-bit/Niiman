function signup() {

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("niimanUser", JSON.stringify(user));

    alert("Account Created Successfully!");

    window.location.href = "login.html";
}


function login() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let savedUser = JSON.parse(localStorage.getItem("niimanUser"));


    if(savedUser && savedUser.email === email && savedUser.password === password){

        localStorage.setItem("loggedInUser", savedUser.name);

        alert("Login Successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid Email or Password");

    }

}
