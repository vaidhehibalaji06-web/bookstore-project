function login() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !email || !nickname) {
        alert("Please fill all required fields");
        return;
    }

    const user = { name, email, nickname, phone, address };

    fetch("https://bookstore-backend-h124.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("user", JSON.stringify({
            id: data.userId,
            name,
            email,
            nickname,
            phone,
            address
        }));

        alert("Login successful ✅");
        window.location.href = "index.html";
    })
    .catch(err => {
        console.log(err);
        alert("Error saving user");
    });
}