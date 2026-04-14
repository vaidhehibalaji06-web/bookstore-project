const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

console.log("Server file running...");

// TEST ROUTE
app.get('/test', (req, res) => {
    res.send("Working ✅");
});

// HOME ROUTE
app.get('/', (req, res) => {
    res.send("Home route working 🚀");
});

// BOOKS ROUTE
app.get('/books', (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching books");
        } else {
            res.json(result);
        }
    });
});

// SAVE / LOGIN USER
app.post('/users', (req, res) => {
    const { name, nickname, email, phone, address } = req.body;

    const checkSql = `SELECT * FROM users WHERE email = ?`;

    db.query(checkSql, [email], (checkErr, checkResult) => {
        if (checkErr) {
            console.log("Check user error:", checkErr);
            return res.status(500).send("Error checking user");
        }

        if (checkResult.length > 0) {
            return res.json({
                message: "User already exists",
                userId: checkResult[0].id
            });
        }

        const insertSql = `
            INSERT INTO users (name, nickname, email, phone, address)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertSql, [name, nickname, email, phone, address], (insertErr, result) => {
            if (insertErr) {
                console.log("User insert error:", insertErr);
                return res.status(500).send("Error saving user");
            }

            res.json({
                message: "User saved successfully",
                userId: result.insertId
            });
        });
    });
});

// PLACE ORDER
app.post('/orders', (req, res) => {
    const { user_id, total_amount, items } = req.body;

    const orderSql = `
        INSERT INTO orders (user_id, total_amount)
        VALUES (?, ?)
    `;

    db.query(orderSql, [user_id, total_amount], (err, orderResult) => {
        if (err) {
            console.log("Order insert error:", err);
            return res.status(500).send("Error creating order");
        }

        const orderId = orderResult.insertId;

        const orderItemsValues = items.map(item => [
            orderId,
            item.item_type,
            item.item_id,
            item.quantity,
            item.price
        ]);

        const orderItemsSql = `
            INSERT INTO order_items (order_id, item_type, item_id, quantity, price)
            VALUES ?
        `;

        db.query(orderItemsSql, [orderItemsValues], (err2) => {
            if (err2) {
                console.log("Order items error:", err2);
                return res.status(500).send("Error saving order items");
            }

            items.forEach(item => {
                if (item.item_type === 'book') {
                    const updateSql = `
                        UPDATE books
                        SET stock = stock - ?,
                            sold_count = sold_count + ?
                        WHERE id = ?
                    `;

                    db.query(updateSql, [item.quantity, item.quantity, item.item_id], (err3) => {
                        if (err3) {
                            console.log("Book update error:", err3);
                        }
                    });
                }
            });

            res.send("Order placed successfully");
        });
    });
});

// ADMIN LOGIN
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;

    const sql = `
        SELECT * FROM admin
        WHERE username = ? AND password = ?
    `;

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error during admin login");
        }

        if (result.length > 0) {
            res.json({
                message: "Admin login successful",
                adminId: result[0].id,
                username: result[0].username
            });
        } else {
            res.status(401).send("Invalid admin credentials");
        }
    });
});

// ADMIN SUMMARY ROUTES
app.get('/admin/total-users', (req, res) => {
    db.query("SELECT COUNT(*) AS total_users FROM users", (err, result) => {
        if (err) return res.status(500).send("Error fetching total users");
        res.json(result[0]);
    });
});

app.get('/admin/total-orders', (req, res) => {
    db.query("SELECT COUNT(*) AS total_orders FROM orders", (err, result) => {
        if (err) return res.status(500).send("Error fetching total orders");
        res.json(result[0]);
    });
});

app.get('/admin/total-stock', (req, res) => {
    db.query("SELECT SUM(stock) AS total_books_in_stock FROM books", (err, result) => {
        if (err) return res.status(500).send("Error fetching stock");
        res.json(result[0]);
    });
});

app.get('/admin/total-sold', (req, res) => {
    db.query("SELECT SUM(sold_count) AS total_books_sold FROM books", (err, result) => {
        if (err) return res.status(500).send("Error fetching sold count");
        res.json(result[0]);
    });
});

// ADMIN TABLE ROUTES
app.get('/admin/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).send("Error fetching users");
        res.json(result);
    });
});

app.get('/admin/books', (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) return res.status(500).send("Error fetching books");
        res.json(result);
    });
});

app.get('/admin/orders', (req, res) => {
    db.query("SELECT * FROM orders", (err, result) => {
        if (err) return res.status(500).send("Error fetching orders");
        res.json(result);
    });
});

app.get('/admin/order-items', (req, res) => {
    db.query("SELECT * FROM order_items", (err, result) => {
        if (err) return res.status(500).send("Error fetching order items");
        res.json(result);
    });
});

// START SERVER
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});