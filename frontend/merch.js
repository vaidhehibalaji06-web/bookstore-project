const merchContainer = document.getElementById("merch-container");

const items = [
    {
        id: 1,
        name: "Bookmark",
        price: 50,
        image: "images/bookmark.jpg"
    },
    {
        id: 2,
        name: "Pen",
        price: 30,
        image: "images/pen.jpg"
    },
    {
        id: 3,
        name: "Coffee Mug",
        price: 200,
        image: "images/mug.jpg"
    },
    {
        id: 4,
        name: "Pencil",
        price: 20,
        image: "images/pencil.jpg"
    }
];

items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("book");

    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${Number(item.price).toFixed(2)}</p>
        <button onclick="addMerch(${item.id}, '${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
    `;

    merchContainer.appendChild(div);
});

function addMerch(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id: id,
        title: name,
        author: "Merchandise",
        price: Number(price),
        image_front: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");
}