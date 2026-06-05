const db = require("../db");

exports.createOrder = (req, res) => {
    const { total } = req.body;
    const userId = req.user.id;

    if (total == null || total <= 0) {
        return res.status(400).json({ message: "A valid order total is required" });
    }

    db.query(
        "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
        [userId, total, "pending"],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed to create order" });
            }

            res.status(201).json({
                message: "Order placed successfully",
                orderId: result.insertId,
            });
        }
    );
};

exports.getMyOrders = (req, res) => {
    db.query(
        "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
        [req.user.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch orders" });
            }

            res.json(results);
        }
    );
};

exports.getOrderById = (req, res) => {
    db.query(
        "SELECT * FROM orders WHERE id = ? AND user_id = ?",
        [req.params.id, req.user.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch order" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.json(results[0]);
        }
    );
};
