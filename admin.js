import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    getDocs,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const totalOrders = document.getElementById("totalOrders");
const ordersContainer = document.getElementById("ordersContainer");

const processingOrders =
    document.getElementById("processingOrders");

const shippedOrders =
    document.getElementById("shippedOrders");

const deliveredOrders =
    document.getElementById("deliveredOrders");


const ADMIN_EMAIL = "sibupodiami01@gmail.com";


onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.replace("login.html");
        return;
    }


    if (user.email !== ADMIN_EMAIL) {
        alert("Access Denied!");
        window.location.replace("index.html");
        return;
    }


    try {

        const querySnapshot =
            await getDocs(collection(db, "orders"));

        console.log(
            "ORDERS COUNT:",
            querySnapshot.size
        );


        totalOrders.innerText =
            querySnapshot.size;

        ordersContainer.innerHTML = "";


        let processingCount = 0;
        let shippedCount = 0;
        let deliveredCount = 0;


        querySnapshot.forEach((orderDoc) => {

            const order = orderDoc.data();

            console.log(
                "ORDER STATUS:",
                order.status
            );


            if (order.status === "Processing") {
                processingCount++;
            }


            if (order.status === "Shipped") {
                shippedCount++;
            }


            if (order.status === "Delivered") {
                deliveredCount++;
            }


            const card =
                document.createElement("div");


            card.className =
                "order-card " +
                (
                    order.status
                    ? order.status.toLowerCase()
                    : "confirmed"
                );


            card.innerHTML = `

                <h3>${order.id}</h3>

                <p>
                    Customer:
                    ${order.name || "Guest"}
                </p>

                <p>
                    Total:
                    ₹${Number(order.total).toFixed(2)}
                </p>

                <p>
                    Status:

                    <select
                        class="statusSelect"
                        data-id="${orderDoc.id}"
                    >

                        <option value="Confirmed"
                        ${order.status === "Confirmed" ? "selected" : ""}>
                            Confirmed
                        </option>

                        <option value="Processing"
                        ${order.status === "Processing" ? "selected" : ""}>
                            Processing
                        </option>

                        <option value="Shipped"
                        ${order.status === "Shipped" ? "selected" : ""}>
                            Shipped
                        </option>

                        <option value="Delivered"
                        ${order.status === "Delivered" ? "selected" : ""}>
                            Delivered
                        </option>

                        <option value="Cancelled"
                        ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>

                    </select>

                </p>

            `;


            ordersContainer.appendChild(card);


            const select =
                card.querySelector(".statusSelect");


            select.addEventListener(
                "change",
                async () => {

                    const orderId =
                        select.dataset.id;

                    const newStatus =
                        select.value;


                    try {

                        await updateDoc(
                            doc(
                                db,
                                "orders",
                                orderId
                            ),
                            {
                                status: newStatus
                            }
                        );


                        alert(
                            "Order Status Updated: " +
                            newStatus
                        );


                    } catch (error) {

                        console.error(error);

                        alert(
                            "Update Failed: " +
                            error.message
                        );

                    }

                }
            );

        });


        processingOrders.innerText =
            processingCount;

        shippedOrders.innerText =
            shippedCount;

        deliveredOrders.innerText =
            deliveredCount;


        console.log(
            "PROCESSING:",
            processingCount
        );

        console.log(
            "SHIPPED:",
            shippedCount
        );

        console.log(
            "DELIVERED:",
            deliveredCount
        );


    } catch (error) {

        console.error(error);

        alert(
            "Orders Load Failed: " +
            error.message
        );

    }

});
