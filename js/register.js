document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    const alertBox = document.getElementById("alert-box");

    if (Auth.isLoggedIn()) {
        window.location.href = "shop.html";
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        alertBox.innerHTML = "";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm-password").value;
        const submitBtn = form.querySelector("button[type='submit']");

        if (password !== confirm) {
            alertBox.innerHTML = `<div class="alert alert-danger">Passwords do not match</div>`;
            return;
        }

        if (password.length < 6) {
            alertBox.innerHTML = `<div class="alert alert-danger">Password must be at least 6 characters</div>`;
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Creating account...";

        try {
            await API.register(name, email, password);
            alertBox.innerHTML = `<div class="alert alert-success">Account created! Redirecting to login...</div>`;
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } catch (error) {
            alertBox.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
            submitBtn.disabled = false;
            submitBtn.textContent = "Register";
        }
    });
});
