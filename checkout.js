// ===== Niiman Checkout =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let total = 0;

if(cart.length === 0){

    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

}else{

    cart.forEach(item => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let div = document.createElement("div");

        div.innerHTML = `
        <h3>${item.name}</h3>
        Price: ₹${item.price}<br>
        Size: ${item.size || "N/A"}<br>
        Qty: ${item.quantity}<br><br>
        `;

        checkoutItems.appendChild(div);

    });

}

checkoutTotal.textContent = total;


// Place Order

const placeOrder = document.getElementById("placeOrder");

placeOrder.onclick = function(){

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;


    if(name === "" || phone === "" || address === ""){

        alert("Please fill all details");

        return;

    }


    localStorage.removeItem("cart");

    window.location.href = "order-success.html";

};
