const router = require("express").Router();
const stockRoutes = require("./stock");
const companyRoutes = require("./company");

// stock routes
router.use("/stock", stockRoutes);

router.use("/company",companyRoutes)

module.exports = router;
