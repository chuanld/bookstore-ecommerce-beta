const router = require("express").Router();
const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middleware/authen");
const authAdmin = require("../middleware/authenAdmin");

router
  .route("/order")
  .get(auth, authAdmin, orderCtrl.getOrder)
  .post(auth, orderCtrl.createOrder);

module.exports = router;
