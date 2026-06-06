const Nav = {
    updateAuthLinks() {
        const container = document.getElementById("auth-links");
        if (!container) return;

        const user = Auth.getUser();

        if (Auth.isLoggedIn() && user) {
            container.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="orders.html">Orders</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        ${user.name}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="orders.html">My Orders</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
                    </ul>
                </li>
            `;

            document.getElementById("logout-btn").addEventListener("click", (e) => {
                e.preventDefault();
                Auth.logout();
                window.location.href = "index.html";
            });
        } else {
            container.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="register.html">Register</a>
                </li>
            `;
        }
    },

    updateCartBadge() {
        const badge = document.getElementById("cart-count");
        if (!badge) return;

        const count = Cart.getCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? "inline-flex" : "none";
    },

    init() {
        this.updateAuthLinks();
        this.updateCartBadge();
    },
};

document.addEventListener("DOMContentLoaded", () => Nav.init());
