require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const flowerRoutes = require("./routes/flowerRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use("/api/auth", authRoutes);
app.use("/api/flowers", flowerRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Flower Shop API Running" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
