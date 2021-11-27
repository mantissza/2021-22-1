const express = require("express");

const router = express.Router();

// localhost:4000/example/
router.get("/", async (req, res) => {
    res.send({ message: "Example router" });
});

module.exports = router;
