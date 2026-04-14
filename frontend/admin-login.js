function adminLogin() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    fetch("https://bookstore-backend-h124.onrender.com/admin-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Invalid login");
        }
        return res.json();
    })
    .then(data => {
        localStorage.setItem("admin", JSON.stringify(data));
        alert("Admin login successful ✅");
        window.location.href = "admin.html";
    })
    .catch(err => {
        alert("Invalid admin credentials");
    });
}