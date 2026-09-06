// ===== Product Page Cart =====

const productAddCart = document.getElementById("productAddCart");
  
let quantity = 1;

if (productAddCart) {

    productAddCart.addEventListener("click", function () {
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const productName = productAddCart.dataset.name;
        const productPrice = Number(productAddCart.dataset.price);
        const productSize = selectedSize;

        // Same product + same size = increase quantity
        const existingProduct = cart.find(
            item =>
                item.name === productName &&
                item.size === productSize
        );

        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {
    cart.push({
       name: productName,
       price: productPrice,
       size: productSize,
       quantity: quantity
    });

        }

        localStorage.setItem("cart", JSON.stringify(cart));
         
        alert(localStorage.getItem("cart"));

        const toast = document.getElementById("toast");

        if (toast) {

            toast.textContent =
                "✅ " +
                productName +
                " (" +
                productSize +
                ") added to cart!";

            toast.classList.add("show");

            setTimeout(function () {

                toast.classList.remove("show");

            }, 2000);

        }

    });

}


// ===== Product Page Wishlist Toggle =====

const productWishlist =
    document.getElementById("productWishlist");

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

if (
    productWishlist &&
    wishlist.includes(productWishlist.dataset.name)
) {

    productWishlist.textContent = "❤️ Added";

} else if (productWishlist) {

    productWishlist.textContent = "🤍 Wishlist";

}


if (productWishlist) {

    productWishlist.addEventListener("click", function () {

        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        const productName =
            productWishlist.dataset.name;

        if (wishlist.includes(productName)) {

            wishlist = wishlist.filter(
                item => item !== productName
            );

            productWishlist.textContent = "🤍 Wishlist";

        } else {

            wishlist.push(productName);

            productWishlist.textContent = "❤️ Added";

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    });

}


// ===== Quantity Selector =====


const savedQuantity =
    localStorage.getItem("productQuantity");

if (savedQuantity) {

    quantity = Number(savedQuantity);

    if (quantity < 1) {
        quantity = 1;
    }

}


const quantityText =
    document.getElementById("quantity");

if (quantityText) {

    quantityText.textContent = quantity;

}


const plusBtn =
    document.getElementById("plusBtn");

const minusBtn =
    document.getElementById("minusBtn");


if (plusBtn) {

    plusBtn.addEventListener("click", function () {

        quantity++;

        quantityText.textContent = quantity;

        localStorage.setItem(
            "productQuantity",
            quantity
        );

    });

}


if (minusBtn) {

    minusBtn.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

        }

        quantityText.textContent = quantity;

        localStorage.setItem(
            "productQuantity",
            quantity
        );

    });

}


// ===== Size Selection =====

const sizeButtons =
    document.querySelectorAll(".sizeBtn");

let selectedSize =
    localStorage.getItem("selectedSize") || "M";


// Set saved size as active

sizeButtons.forEach(button => {

    if (button.dataset.size === selectedSize) {

        button.classList.add("active");

    } else {

        button.classList.remove("active");

    }

});


// Update Add to Cart size

if (productAddCart) {

    productAddCart.dataset.size = selectedSize;

}


// Size button click

sizeButtons.forEach(button => {

    button.addEventListener("click", function () {

        sizeButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        selectedSize =
            this.dataset.size;

        // Save selected size

        localStorage.setItem(
            "selectedSize",
            selectedSize
        );

        // Update Add to Cart button

        if (productAddCart) {

            productAddCart.dataset.size =
                selectedSize;

        }

    });

});
