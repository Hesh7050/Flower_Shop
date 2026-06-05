const db = require("../db");

exports.getAllFlowers = (req, res) => {
    db.query("SELECT * FROM flowers", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch flowers" });
        }

        res.json(results);
    });
};

exports.getFlowerById = (req, res) => {
    db.query(
        "SELECT * FROM flowers WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch flower" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Flower not found" });
            }

            res.json(results[0]);
        }
    );
};
