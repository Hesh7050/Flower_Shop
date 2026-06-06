function renderCartItem(item) {
    return `
        <tr>
            <td>
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>${formatPrice(item.price)}</td>
            <td>
                <input
                    type="number"
                    class="form-control qty-input"
                    min="1"
                    value="${item.quantity}"
                    data-id="${item.id}"
                >
            </td>
            <td>${formatPrice(item.price * item.quantity)}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${item.id}">Remove</button>
            </td>
        </tr>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("cart-items");
    const emptyState = document.getElementById("cart-empty");
    const cartContent = document.getElementById("cart-content");
    const subtotalEl = document.getElementById("cart-subtotal");
    const checkoutBtn = document.getElementById("checkout-btn");
    const alertBox = document.getElementById("alert-box");

    function renderCart() {
        const items = Cart.getItems();

        if (items.length === 0) {
            emptyState.classList.remove("d-none");
            cartContent.classList.add("d-none");
            return;
        }

        emptyState.classList.add("d-none");
        cartContent.classList.remove("d-none");
        tableBody.innerHTML = items.map(renderCartItem).join("");
        subtotalEl.textContent = formatPrice(Cart.getTotal());

        tableBody.querySelectorAll(".qty-input").forEach((input) => {
            input.addEventListener("change", () => {
                Cart.updateQuantity(
                    parseInt(input.dataset.id, 10),
                    parseInt(input.value, 10)
                );
                renderCart();
            });
        });

        tableBody.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                Cart.removeItem(parseInt(btn.dataset.id, 10));
                renderCart();
            });
        });
    }

    checkoutBtn.addEventListener("click", async () => {
        alertBox.innerHTML = "";

        if (!Auth.isLoggedIn()) {
            window.location.href = "login.html";
            return;
        }

        if (Cart.getItems().length === 0) {
            alertBox.innerHTML = `<div class="alert alert-warning">Your cart is empty</div>`;
            return;
        }

        checkoutBtn.disabled = true;
        checkoutBtn.textContent = "Placing order...";

        try {
            const data = await API.createOrder(Cart.getTotal());
            Cart.clear();
            alertBox.innerHTML = `
                <div class="alert alert-success">
                    Order #${data.orderId} placed successfully!
                    <a href="orders.html" class="alert-link">View your orders</a>
                </div>
            `;
            renderCart();
        } catch (error) {
            alertBox.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        } finally {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Checkout";
        }
    });

    renderCart();
});
