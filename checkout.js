import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// ===== Niiman Checkout =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let total = 0;
let finalPayable = 0;

if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
} else {
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        checkoutItems.innerHTML += `
        <div class="checkout-item">
            <img src="${item.image}" width="70">
            <div>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Size: ${item.size || "M"}</p>
                <p>Qty: ${item.quantity}</p>
                <p>Subtotal: ₹${itemTotal}</p>
            </div>
        </div>
        `;
    });
}

checkoutTotal.textContent = total;
document.getElementById("subtotal").innerText =
    "Subtotal: ₹" + total.toFixed(2);

let deliveryCharge = total < 2000 ? 50 : 0;

document.getElementById("deliveryCharge").innerText =
    deliveryCharge === 0
        ? "Delivery: Free Delivery 🎉"
        : "Delivery: ₹50";

document.getElementById("discountAmount").innerText =
    "Discount: ₹0";

// Place Order
const placeOrder = document.getElementById("placeOrder");

placeOrder.onclick = async function() {
    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all details");
        return;
    }

    finalPayable = total - discount + (total < 2000 ? 50 : 0);

    let orderID = "NIM" + Date.now();

let orderData = {
    id: orderID,
    date: new Date().toLocaleString(),
    uid: auth.currentUser ? auth.currentUser.uid : null,
    name: name,
    phone: phone,
    address: address,
    items: cart,
    total: finalPayable
};

// Save Order to Firestore
try {
    await addDoc(collection(db, "orders"), orderData);
    console.log("Firestore Order Saved:", orderData);
} catch (error) {
    alert(error.message);
console.error("Firestore Save Error:", error);
}

localStorage.setItem("lastOrder", JSON.stringify(orderData));

localStorage.removeItem("cart");

window.location.href = "order-success.html";
};

let discount = 0;

document.getElementById("applyCoupon").addEventListener("click", () => {

    const coupon = document.getElementById("couponCode").value.trim();
    const message = document.getElementById("couponMessage");

    if (coupon === "SAVE10") {
        discount = total * 0.10;
        document.getElementById("discountAmount").innerText =
    "Discount: -₹" + discount.toFixed(2);
        message.innerText = "Coupon applied! 10% discount added ✅";
        message.style.color = "green";
    } 
    else {
        discount = 0;
        document.getElementById("discountAmount").innerText =
    "Discount: ₹0";
        message.innerText = "Invalid coupon code ❌";
        message.style.color = "red";
    }

if (deliveryCharge === 0) {
    document.getElementById("deliveryCharge").innerText =
        "Delivery: Free Delivery 🎉";
} else {
    document.getElementById("deliveryCharge").innerText =
        "Delivery: ₹50";
}

finalPayable = total - discount + deliveryCharge;

document.getElementById("checkoutTotal").innerText =
    "Total Payable: ₹" + finalPayable.toFixed(2);

});
