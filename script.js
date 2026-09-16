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

    setTimeout(() => {
        formMessage.innerHTML = "";
    }, 3000);

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

// ===== Professional Shopping Cart =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const clearCart = document.getElementById("clearCart");
const buttons = document.querySelectorAll(".addToCart");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    cartItems.innerHTML = "";
    
    if (cart.length === 0) {

    cartItems.innerHTML = "<p>🛒 Your cart is empty.</p>";

    cartTotal.textContent = "0";
    cartCount.textContent = "0";

    saveCart();

    return;
}    

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
<img src="${item.image || 'logo.png'}" class="cart-image">

<strong>${item.name}</strong><br>
₹${item.price}<br>
Size: ${item.size || "M"}<br>
Qty: ${item.quantity}<br><br>
Subtotal: ₹${item.price * item.quantity}<br><br>

<button onclick="decreaseQty(${index})">−</button>

<button onclick="increaseQty(${index})">+</button>

<button onclick="removeItem(${index})">
🗑 Remove
</button>
`;

        cartItems.appendChild(div);

    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;

    saveCart();

}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const existing = cart.find(item => item.name === button.dataset.name);

if(existing){

    existing.quantity++;

}else{

    cart.push({
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image,
        size: button.dataset.size,
        quantity: 1
    });

}

// Remove from wishlist after adding to cart
removeFromWishlist(button.dataset.name);

        renderCart();

        const toast = document.getElementById("toast");

toast.textContent = "✅ " + button.dataset.name + " | size=" + button.dataset.size + " added to cart!";
toast.classList.add("show");

setTimeout(() => {
    toast.classList.remove("show");
}, 2000);
    });

});

cartBtn.onclick = function(e) {
    e.preventDefault();
    cartSidebar.classList.add("open");
}

closeCart.onclick = function() {
    cartSidebar.classList.remove("open");
}

clearCart.onclick = function(){

    cart = [];

    localStorage.removeItem("cart");

    renderCart();

}

function increaseQty(index) {

    cart[index].quantity++;

    renderCart();

}


function decreaseQty(index) {

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    renderCart();

}

function removeItem(index) {

    cart.splice(index, 1);

    renderCart();

}

renderCart();

// ===== Product Search =====

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        productCards.forEach(card => {

            const name = card.querySelector("h3").textContent.toLowerCase();

            if (name.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}

function showToast() {
    const toast = document.getElementById("toast");

    toast.textContent = "✅ Message Sent Successfully!";
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ===== Wishlist v1.0 =====

let wishlist = getWishlist();
const wishlistItems = document.getElementById("wishlistItems");
const wishlistCount = document.getElementById("wishlistCount");

function normalizeWishlistItem(item) {
    if (typeof item === "string") {
        const legacyMap = {
            "Niiman T-Shirt": { name: "Niiman T-Shirt", price: "999", image: "tshirt.jpg" },
            "Niiman Hoodie": { name: "Niiman Hoodie", price: "1999", image: "hoodie.jpg" },
            "Niiman Cap": { name: "Niiman Cap", price: "599", image: "cap.jpg" }
        };
        return legacyMap[item] || { name: item, price: "", image: "" };
    }
    return item || {};
}

function renderWishlist() {
    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = "<p>❤️ Your wishlist is empty.</p>";
        return;
    }

    wishlist.forEach((item, index) => {
        const product = normalizeWishlistItem(item);

        const div = document.createElement("div");
        div.innerHTML = `
            <p>
                ${product.name}${product.price ? " - ₹" + product.price : ""}
                <button onclick="removeWishlist(${index})">❌</button>
            </p>
        `;

        wishlistItems.appendChild(div);
    });
}

function removeWishlist(index) {

    const product = wishlist[index];

    removeFromWishlist(product.name);

    wishlist = getWishlist();

    updateWishlistCount();
    renderWishlist();
}

function updateWishlistCount() {
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

updateWishlistCount();
renderWishlist();

const wishlistButtons = document.querySelectorAll(".wishlistBtn");

wishlistButtons.forEach(button => {

    const productData = {
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.image
    };

    const saved = wishlist.some(item => {
        if (typeof item === "string") {
            return item === productData.name;
        }

        return item && item.name === productData.name;
    });

    if (saved) {
        button.textContent = "❤️";
    }

    button.addEventListener("click", () => {

    if (isInWishlist(productData.name)) {

        removeFromWishlist(productData.name);

        button.textContent = "🤍";

    } else {

        addToWishlist(productData);

        button.textContent = "❤️";

    }

    wishlist = getWishlist();

    updateWishlistCount();
    renderWishlist();

});


// ===== Wishlist Sidebar =====

const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistSidebar = document.getElementById("wishlistSidebar");
const closeWishlist = document.getElementById("closeWishlist");

if (wishlistBtn) {

    wishlistBtn.onclick = function(e) {

    // Sidebar open nahi karna
    // Direct wishlist.html open hoga

};

if (closeWishlist) {

    closeWishlist.onclick = function() {

        if (wishlistSidebar) {
            wishlistSidebar.classList.remove("open");
        }

    };

}

// ===== Checkout Button =====

const checkoutBtn = document.querySelector("#checkoutBtn");

checkoutBtn.addEventListener("click", function(){

    window.location.href = "checkout.html";

});

// ===== Login / Profile Button =====

const authBtn = document.querySelector("#authBtn");
const loggedInUser = localStorage.getItem("loggedInUser");

if (authBtn) {

    if (loggedInUser) {

        authBtn.textContent = "👤 " + loggedInUser;
        authBtn.href = "profile.html";

    } else {

        authBtn.textContent = "🔐 Login";
        authBtn.href = "login.html";

    }

}

}
