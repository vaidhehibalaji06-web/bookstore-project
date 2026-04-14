const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartItems.innerHTML = "";
    let sum = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='color:white; text-align:center;'>Your cart is empty</p>";
        total.innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("book");

        div.innerHTML = `
            <img src="${item.image_front}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.author}</p>
            <p>₹${Number(item.price).toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItems.appendChild(div);
        sum += Number(item.price);
    });

    total.innerText = "Total: ₹" + sum.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function buyNow() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    window.location.href = "payment.html";
}

renderCart();