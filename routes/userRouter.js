const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middleware/authen");
const authAdmin = require("../middleware/authenAdmin");

router.post("/register", userCtrl.register);

//new
router.post("/activation", userCtrl.activation);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", auth, userCtrl.getUser);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset", auth, userCtrl.resetPassword);

router.patch("/change", auth, userCtrl.changePassword);

router.patch("/update", auth, userCtrl.updateUser);

router.get("/all_infor", auth, authAdmin, userCtrl.getAllUsers);

router.post("/create_infor", auth, authAdmin, userCtrl.createUser);

router.patch("/all_update/:id", auth, authAdmin, userCtrl.updateAllUsers);

router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUsers);
//addCart
router.patch("/addtocart", auth, userCtrl.addtoCart);
//Order
router.get("/order_infor", auth, userCtrl.orderInfo);
module.exports = router;
