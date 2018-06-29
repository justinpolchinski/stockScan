const router = require("express").Router();
const stockRoutes = require("./stock");

// stock routes
router.use("/stock", stockRoutes);

module.exports = router;
