import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const ordersList = document.getElementById("ordersList");

onAuthStateChanged(auth, (user) => {

    if (!user) {
    window.location.replace("login.html");
    return;
}

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {

        ordersList.innerHTML = "<p>No Orders Found</p>";

    } else {

        ordersList.innerHTML = "";

        orders.forEach(order => {

            let orderBox = document.createElement("div");

            orderBox.className = "order-card";

            orderBox.innerHTML = `
                <h3>Order ID: ${order.id}</h3>
                <p>📅 Date: ${order.date}</p>
                <p>💰 Total: ₹${order.total}</p>
                <p>🛍️ Items: ${order.items.length}</p>
            `;

            ordersList.appendChild(orderBox);

        });

    }

});
