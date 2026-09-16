// ===== Niiman Order History =====

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let ordersList = document.getElementById("ordersList");


if(orders.length === 0){

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
