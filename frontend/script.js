window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const nicknameEl = document.getElementById("nicknameDisplay");
    if (user && user.nickname && nicknameEl) {
        nicknameEl.textContent = `Hi, ${user.nickname} 👋`;
    }

    const logoutBtn = document.querySelector(".logout-btn");
    if (!user && logoutBtn) {
        logoutBtn.style.display = "none";
    }

    loadBooks();

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const value = this.value.toLowerCase();

            const filtered = allBooks.filter(book =>
                book.title.toLowerCase().includes(value) ||
                book.author.toLowerCase().includes(value)
            );

            displayBooks(filtered);
        });
    }
});

let allBooks = [];

function loadBooks() {
    fetch("http://localhost:3001/books")
        .then(res => res.json())
        .then(data => {
            allBooks = data;
            displayBooks(data);
        })
        .catch(err => {
            console.log("Error loading books:", err);
        });
}

function displayBooks(books) {
    const container = document.getElementById("books-container");
    if (!container) return;

    container.innerHTML = "";

    books.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book");

        div.innerHTML = `
            <img src="${book.image_front}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>₹${book.price}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;

        container.appendChild(div);
    });
}

function addToCart(id) {
    const book = allBooks.find(b => b.id === id);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: Number(book.price),
        image_front: book.image_front
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(book.title + " added to cart 🛒");
}

function logout() {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    window.location.href = "login.html";
}

function filterGenre(genre) {
    const filtered = genre === "All"
        ? allBooks
        : allBooks.filter(book =>
            book.genre &&
            book.genre.trim().toLowerCase() === genre.trim().toLowerCase()
        );

    displayBooks(filtered);
}