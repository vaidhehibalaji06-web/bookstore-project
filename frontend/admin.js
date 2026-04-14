const admin = JSON.parse(localStorage.getItem("admin"));

if (!admin) {
    alert("Please login as admin first");
    window.location.href = "admin-login.html";
}

function adminLogout() {
    localStorage.removeItem("admin");
    alert("Admin logged out");
    window.location.href = "admin-login.html";
}

// SUMMARY
fetch("http://localhost:3001/admin/total-users")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalUsers").innerText = data.total_users || 0;
    });

fetch("http://localhost:3001/admin/total-orders")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalOrders").innerText = data.total_orders || 0;
    });

fetch("http://localhost:3001/admin/total-stock")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalStock").innerText = data.total_books_in_stock || 0;
    });

fetch("http://localhost:3001/admin/total-sold")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalSold").innerText = data.total_books_sold || 0;
    });

// USERS TABLE
fetch("http://localhost:3001/admin/users")
    .then(res => res.json())
    .then(data => {
        let html = "<table border='1'><tr><th>ID</th><th>Name</th><th>Nickname</th><th>Email</th><th>Phone</th><th>Address</th></tr>";

        data.forEach(user => {
            html += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name || ""}</td>
                    <td>${user.nickname || ""}</td>
                    <td>${user.email || ""}</td>
                    <td>${user.phone || ""}</td>
                    <td>${user.address || ""}</td>
                </tr>
            `;
        });

        html += "</table>";
        document.getElementById("usersTable").innerHTML = html;
    });

// BOOKS TABLE
fetch("http://localhost:3001/admin/books")
    .then(res => res.json())
    .then(data => {
        let html = "<table border='1'><tr><th>ID</th><th>Title</th><th>Author</th><th>Genre</th><th>Price</th><th>Offer Price</th><th>Stock</th><th>Sold Count</th></tr>";

        data.forEach(book => {
            html += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title || ""}</td>
                    <td>${book.author || ""}</td>
                    <td>${book.genre || ""}</td>
                    <td>${book.price || 0}</td>
                    <td>${book.offer_price || 0}</td>
                    <td>${book.stock || 0}</td>
                    <td>${book.sold_count || 0}</td>
                </tr>
            `;
        });

        html += "</table>";
        document.getElementById("booksTable").innerHTML = html;
    });

// ORDERS TABLE
fetch("http://localhost:3001/admin/orders")
    .then(res => res.json())
    .then(data => {
        let html = "<table border='1'><tr><th>ID</th><th>User ID</th><th>Total Amount</th><th>Order Date</th></tr>";

        data.forEach(order => {
            html += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.user_id}</td>
                    <td>${order.total_amount}</td>
                    <td>${order.order_date}</td>
                </tr>
            `;
        });

        html += "</table>";
        document.getElementById("ordersTable").innerHTML = html;
    });

// ORDER ITEMS TABLE
fetch("http://localhost:3001/admin/order-items")
    .then(res => res.json())
    .then(data => {
        let html = "<table border='1'><tr><th>ID</th><th>Order ID</th><th>Item Type</th><th>Item ID</th><th>Quantity</th><th>Price</th></tr>";

        data.forEach(item => {
            html += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.order_id}</td>
                    <td>${item.item_type}</td>
                    <td>${item.item_id}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                </tr>
            `;
        });

        html += "</table>";
        document.getElementById("orderItemsTable").innerHTML = html;
    });