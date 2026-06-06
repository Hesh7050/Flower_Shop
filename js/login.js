document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("login-form");
    const alertBox = document.getElementById("alert-box");

    if (Auth.isLoggedIn()) {
        window.location.href = "shop.html";
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        alertBox.innerHTML = "";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const submitBtn = form.querySelector("button[type='submit']");

        submitBtn.disabled = true;
        submitBtn.textContent = "Signing in...";

        try {
            const data = await API.login(email, password);
            Auth.saveSession(data.token, data.user);
            window.location.href = "shop.html";
        } catch (error) {
            alertBox.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
            submitBtn.disabled = false;
            submitBtn.textContent = "Login";
        }
    });
});
