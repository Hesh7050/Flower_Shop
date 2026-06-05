const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./db");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Flower Shop API Running");
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});