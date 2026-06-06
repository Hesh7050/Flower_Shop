const CONFIG = {
    API_URL: (() => {
        const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

        if (isLocal) {
            return "http://localhost:3001/api";
        }

        // Replace with your deployed backend URL (Render, Railway, etc.)
        return "https://your-backend-url.onrender.com/api";
    })(),

    IMAGE_FALLBACKS: [
        "Flower1.jpg",
        "Flower2.jpg",
        "Flower3.jpg",
        "Flower4.jpg",
        "Flower5.1.jpg",
        "Flower5.jpg",
        "Flower7.jpg",
        "Flower8.jpg",
        "Flower9.jpg",
        "Flower10.jpg",
        "Flower11.jpg",
        "Flower12.jpg",
    ],
};

function getFlowerImage(flower) {
    if (flower.image && flower.image.startsWith("Flower")) {
        return `images/${flower.image}`;
    }

    const index = ((flower.id - 1) % CONFIG.IMAGE_FALLBACKS.length);
    return `images/${CONFIG.IMAGE_FALLBACKS[index]}`;
}

function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}
