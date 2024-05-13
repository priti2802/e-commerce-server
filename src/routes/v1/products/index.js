const express = require("express");
const router = express.Router();

router.use("/", require("./products.routes"));

module.exports = router;
