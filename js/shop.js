function renderFlowerCard(flower) {
    const image = getFlowerImage(flower);
    const outOfStock = flower.stock <= 0;

    return `
        <div class="col-lg-3 col-md-6">
            <div class="card border-0 shadow-sm h-100 product-card">
                <img src="${image}" class="card-img-top" alt="${flower.name}">
                <div class="card-body text-center d-flex flex-column">
                    <h5>${flower.name}</h5>
                    <p class="text-muted small mb-2">${flower.description || "Fresh hand-picked flowers"}</p>
                    <p class="text-danger fw-bold">${formatPrice(flower.price)}</p>
                    <p class="stock-label ${outOfStock ? "text-danger" : "text-success"}">
                        ${outOfStock ? "Out of stock" : `${flower.stock} in stock`}
                    </p>
                    <button
                        class="btn btn-danger rounded-pill mt-auto add-to-cart-btn"
                        data-id="${flower.id}"
                        ${outOfStock ? "disabled" : ""}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("flowers-grid");
    const alertBox = document.getElementById("alert-box");

    try {
        const flowers = await API.getFlowers();

        if (flowers.length === 0) {
            grid.innerHTML = `<div class="col-12 text-center text-muted py-5">No flowers available right now.</div>`;
            return;
        }

        grid.innerHTML = flowers.map(renderFlowerCard).join("");

        grid.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = parseInt(btn.dataset.id, 10);

                try {
                    const flower = await API.getFlower(id);
                    Cart.addItem(flower);
                    btn.textContent = "Added!";
                    setTimeout(() => {
                        btn.textContent = "Add to Cart";
                    }, 1200);
                } catch (error) {
                    alertBox.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
                }
            });
        });
    } catch (error) {
        grid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Could not load flowers. Make sure the backend is running on port 3001.
                    <br><small>${error.message}</small>
                </div>
            </div>
        `;
    }
});
