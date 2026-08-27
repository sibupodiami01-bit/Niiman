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

// Active Navbar Link Highlight

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 100;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===== Shopping Cart =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const buttons = document.querySelectorAll(".addToCart");

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const item = {
            name: button.dataset.name,
            price: button.dataset.price
        };

        cart.push(item);
        updateCartCount();

        alert(item.name + " added to cart!");
    });
});

updateCartCount();
