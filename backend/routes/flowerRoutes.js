const express = require("express");
const flowerController = require("../controllers/flowerController");

const router = express.Router();

router.get("/", flowerController.getAllFlowers);
router.get("/:id", flowerController.getFlowerById);

module.exports = router;
