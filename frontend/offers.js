const container = document.getElementById("offers-container");

fetch("https://bookstore-backend-h124.onrender.com/books")
    .then(res => res.json())
    .then(data => {

        console.log("Books:", data);

        // Filter books with offers
        const offerBooks = data.filter(book => 
            book.offer_price && book.offer_price > 0
        );

        // Show only first 2 books
        offerBooks.slice(0, 2).forEach(book => {

            const div = document.createElement("div");
            div.classList.add("book");

            div.innerHTML = `
                <img src="${book.image_front}" alt="">
                <h3>${book.title}</h3>
                <p>${book.author}</p>

                <p>
                    <span style="text-decoration: line-through; color:red;">
                        ₹${book.price}
                    </span>
                    <br>
                    <span style="color:white;">
                        ₹${book.offer_price}
                    </span>
                </p>

                <button onclick="addToCart(${book.id})">
                    Add to Cart
                </button>
            `;

            container.appendChild(div);
        });

    })
    .catch(err => {
        console.log("Error:", err);
    });