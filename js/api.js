const API = {
    async request(endpoint, options = {}) {
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        const token = Auth.getToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    },

    register(name, email, password) {
        return this.request("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        });
    },

    login(email, password) {
        return this.request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },

    getFlowers() {
        return this.request("/flowers");
    },

    getFlower(id) {
        return this.request(`/flowers/${id}`);
    },

    createOrder(total) {
        return this.request("/orders", {
            method: "POST",
            body: JSON.stringify({ total }),
        });
    },

    getOrders() {
        return this.request("/orders");
    },
};
