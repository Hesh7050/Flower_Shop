const Cart = {
    KEY: "flower_shop_cart",

    getItems() {
        const items = localStorage.getItem(this.KEY);
        return items ? JSON.parse(items) : [];
    },

    saveItems(items) {
        localStorage.setItem(this.KEY, JSON.stringify(items));
        Nav.updateCartBadge();
    },

    addItem(flower) {
        const items = this.getItems();
        const existing = items.find((item) => item.id === flower.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            items.push({
                id: flower.id,
                name: flower.name,
                price: parseFloat(flower.price),
                image: getFlowerImage(flower),
                quantity: 1,
            });
        }

        this.saveItems(items);
    },

    updateQuantity(id, quantity) {
        const items = this.getItems().map((item) => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, quantity) };
            }
            return item;
        });

        this.saveItems(items);
    },

    removeItem(id) {
        const items = this.getItems().filter((item) => item.id !== id);
        this.saveItems(items);
    },

    clear() {
        localStorage.removeItem(this.KEY);
        Nav.updateCartBadge();
    },

    getTotal() {
        return this.getItems().reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    },

    getCount() {
        return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
    },
};
