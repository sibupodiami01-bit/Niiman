const container = document.getElementById("wishlistContainer");
let wishlist = getWishlist();

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

function renderWishlistPage() {
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
    <div class="empty-wishlist">
        <div class="empty-wishlist-icon">❤️</div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favourite products here.</p>
        <a href="index.html">
            <button>🛍️ Continue Shopping</button>
        </a>
    </div>
`;
        return;
    }

    container.innerHTML = "";

    wishlist.forEach((item, index) => {
        const product = normalizeWishlistItem(item);

        container.innerHTML += `
    <div class="product-card">

        ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ""}

        <div class="wishlist-info">

            <h2>${product.name}</h2>

            <p>₹${product.price || ""}</p>

            <div class="wishlist-buttons">

                <button onclick="addToCart(${index})">
                    🛒 Add to Cart
                </button>

                <button onclick="removeWishlist(${index})">
                    ❌ Remove
                </button>

            </div>

        </div>

    </div>
`;
    });
}

window.removeWishlist = function(index) {

    const product = normalizeWishlistItem(wishlist[index]);

    removeFromWishlist(product.name);

    location.reload();
};

window.addToCart = function(index) {

    const product = normalizeWishlistItem(wishlist[index]);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === product.name);

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));


    // Wishlist se remove
    removeFromWishlist(product.name);


    alert("Added to Cart 🛒");

    location.reload();

};
renderWishlistPage();
