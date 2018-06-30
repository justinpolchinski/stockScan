const router = require("express").Router();
const stockController = require("../../controllers/stockController");
const tweets = require("../../controllers/tweets");

// Matches with "/api/stock"
router.route("/")
  //.get(stockController.findAll)
router.route('/signup/:userName/:password')
  .post(stockController.create);
  router.route('/signin/:userName/:password')
  .post(stockController.signIn);
// Matches with "/api/stock/:id"
 router
   .route("/:id")
   .get(stockController.findById)
   .put(stockController.update);
router.route("/delete/:id")
   .put(stockController.remove);
router.route("/tweets/trump")
    .get(tweets.trump);
module.exports = router;
