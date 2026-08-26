function toggleTheme() {
    document.body.classList.toggle("light");
}

window.addEventListener("load", function() {
    const loader = document.getElementById("loader");

    setTimeout(function() {
        if (loader) {
            loader.style.display = "none";
        }
    }, 1500);
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn){
    menuBtn.onclick = function(){
        navLinks.classList.toggle("show");
    }
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        formMessage.innerHTML = "✅ Message Sent Successfully!";

        contactForm.reset();

    });

}
