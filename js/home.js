document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("home-products");
    if (!grid) return;

    try {
        const flowers = await API.getFlowers();
        const featured = flowers.slice(0, 8);

        if (featured.length === 0) return;

        grid.innerHTML = featured.map((flower) => `
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm h-100">
                    <img src="${getFlowerImage(flower)}" class="card-img-top" alt="${flower.name}">
                    <div class="card-body text-center">
                        <h5>${flower.name}</h5>
                        <p class="text-danger fw-bold">${formatPrice(flower.price)}</p>
                    </div>
                </div>
            </div>
        `).join("");
    } catch (error) {
        // Keep static HTML fallback when backend is offline
    }
});
