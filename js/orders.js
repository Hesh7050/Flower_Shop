document.addEventListener("DOMContentLoaded", async () => {
    if (!Auth.requireAuth()) return;

    const tableBody = document.getElementById("orders-list");
    const emptyState = document.getElementById("orders-empty");
    const ordersContent = document.getElementById("orders-content");
    const alertBox = document.getElementById("alert-box");
    const user = Auth.getUser();

    document.getElementById("user-greeting").textContent = user.name;

    try {
        const orders = await API.getOrders();

        if (orders.length === 0) {
            emptyState.classList.remove("d-none");
            ordersContent.classList.add("d-none");
            return;
        }

        emptyState.classList.add("d-none");
        ordersContent.classList.remove("d-none");

        tableBody.innerHTML = orders.map((order) => {
            const date = new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            const statusClass = order.status === "pending" ? "status-pending" : "status-complete";

            return `
                <tr>
                    <td>#${order.id}</td>
                    <td>${date}</td>
                    <td>${formatPrice(order.total)}</td>
                    <td><span class="order-status ${statusClass}">${order.status}</span></td>
                </tr>
            `;
        }).join("");
    } catch (error) {
        alertBox.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});
