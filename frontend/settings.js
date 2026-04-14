// LOAD USER
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("name").innerText = "Name: " + user.name;
    document.getElementById("email").innerText = "Email: " + user.email;
}

// SAVE EXTRA DETAILS
function saveDetails() {
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);

    alert("Details Saved ✅");
}