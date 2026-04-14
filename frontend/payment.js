function payNow() {
    const cardNumber = document.getElementById("cardNumber").value;
    const cardName = document.getElementById("cardName").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Please fill all payment details");
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty");
        window.location.href = "cart.html";
        return;
    }

    const items = cart.map(item => ({
        item_type: item.author === "Merchandise" ? "merchandise" : "book",
        item_id: item.id,
        quantity: 1,
        price: Number(item.price)
    }));

    const total_amount = items.reduce((sum, item) => sum + item.price, 0);

    fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user.id,
            total_amount,
            items
        })
    })
    .then(res => res.text())
    .then(msg => {
        alert("Payment Successful 🎉 Order placed successfully");

        localStorage.removeItem("cart");
        window.location.href = "index.html";
    })
    .catch(err => {
        console.log(err);
        alert("Error placing order");
    });
}