let order = JSON.parse(localStorage.getItem("lastOrder"));

if (order) {

    document.getElementById("orderID").innerText =
        "Order ID: " + order.orderID;

    document.getElementById("customerName").innerText =
        "Hello " + order.name + " 👋";
let itemsText = "";

order.items.forEach(item => {
    itemsText += 
    `${item.name} | Size: ${item.size || "M"} | Qty: ${item.quantity} | ₹${item.price * item.quantity}<br>`;
});

document.getElementById("orderItems").innerHTML =
    "Items:<br>" + itemsText;

    document.getElementById("orderTotal").innerText =
        "Order Total: ₹" + order.total;
}
