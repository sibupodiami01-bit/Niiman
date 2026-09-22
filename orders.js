import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ===== Niiman My Orders =====

const ordersList = document.getElementById("ordersList");


// ===== HTML Safety =====

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ===== Status Helpers =====

function getStatusIcon(status) {

    switch (status) {

        case "Confirmed":
            return "✅";

        case "Processing":
            return "📦";

        case "Shipped":
            return "🚚";

        case "Delivered":
            return "🏠";

        case "Cancelled":
            return "❌";

        default:
            return "✅";
    }
}


function getStatusClass(status) {

    switch (status) {

        case "Confirmed":
            return "status-confirmed";

        case "Processing":
            return "status-processing";

        case "Shipped":
            return "status-shipped";

        case "Delivered":
            return "status-delivered";

        case "Cancelled":
            return "status-cancelled";

        default:
            return "status-confirmed";
    }
}


// ===== Authentication =====

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.replace("login.html");

        return;
    }


    // ===== User Orders Query =====

    const ordersQuery = query(
        collection(db, "orders"),
        where("uid", "==", user.uid)
    );


    // ===== REAL-TIME FIRESTORE LISTENER =====

    onSnapshot(
        ordersQuery,

        (querySnapshot) => {

            if (querySnapshot.empty) {

                ordersList.innerHTML = `
                    <div class="no-orders">
                        <h3>No Orders Found</h3>
                        <p>You have not placed any orders yet.</p>
                    </div>
                `;

                return;
            }


            ordersList.innerHTML = "";


            querySnapshot.forEach((orderDoc) => {

                const order = orderDoc.data();


                // ===== Order Data =====

                const orderId =
                    escapeHTML(order.id || orderDoc.id);

                const orderDate =
                    escapeHTML(order.date || "N/A");

                const total =
                    Number(order.total || 0);

                const status =
                    order.status || "Confirmed";


                const safeStatus =
                    escapeHTML(status);

                const statusIcon =
                    getStatusIcon(status);

                const statusClass =
                    getStatusClass(status);


                // ===== Products HTML =====

                let itemsHTML = "";


                if (
                    Array.isArray(order.items) &&
                    order.items.length > 0
                ) {

                    order.items.forEach((item) => {

                        const image =
                            escapeHTML(item.image || "");

                        const name =
                            escapeHTML(
                                item.name || "Product"
                            );

                        const size =
                            escapeHTML(
                                item.size || "M"
                            );

                        const quantity =
                            Number(item.quantity || 1);

                        const price =
                            Number(item.price || 0);


                        itemsHTML += `

                            <div class="order-product">

                                <img
                                    src="${image}"
                                    alt="${name}"
                                    width="60"
                                >

                                <div class="order-product-info">

                                    <p>
                                        <b>${name}</b>
                                    </p>

                                    <p>
                                        Size: ${size}
                                    </p>

                                    <p>
                                        Qty: ${quantity}
                                    </p>

                                    <p>
                                        Price: ₹${price.toFixed(2)}
                                    </p>

                                </div>

                            </div>
                        `;
                    });

                } else {

                    itemsHTML = `
                        <p>No product details available.</p>
                    `;
                }


                // ===== Order Card =====

                const orderBox =
                    document.createElement("div");


                orderBox.className = "order-card";


                orderBox.innerHTML = `

                    <div class="order-header">

                        <h3>
                            Order ID:
                            ${orderId}
                        </h3>

                    </div>


                    <p>
                        📅 Date:
                        ${orderDate}
                    </p>


                    <p>
                        💰 Total:
                        ₹${total.toFixed(2)}
                    </p>


                    <p class="order-status">

                        📦 Status:

                        <span class="status-badge ${statusClass}">
                            ${statusIcon}
                            ${safeStatus}
                        </span>

                    </p>


                    <h4>
                        🛒 Products
                    </h4>


                    <div class="order-products">

                        ${itemsHTML}

                    </div>
                `;


                ordersList.appendChild(orderBox);

            });

        },


        (error) => {

            console.error(
                "Orders Realtime Error:",
                error
            );


            ordersList.innerHTML = `
                <div class="no-orders">

                    <h3>
                        Unable to load orders
                    </h3>

                    <p>
                        Please try again later.
                    </p>

                </div>
            `;
        }
    );

});
