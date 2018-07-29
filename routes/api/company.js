const router = require("express").Router();
const companyController = require("../../controllers/companyController");

//going to look up in companyController
router.route("/:companyName")
    .get(companyController.companyCheck);
module.exports = router;