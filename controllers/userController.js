const Users = require("../models/userModel");
const Orders = require("../models/orderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, address, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "The email is already exist" }); //Check exist
      }
      //Check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });
      //Encode password
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        address,
        password: passwordHash,
      });
      //  ---------This code for register basic------------
      //Save on cloud MongoDB
      await newUser.save();
      res.json({ msg: "Register successfully. Login and come with us <3" });

      //Using jwt to authentication
      // const accesstoken = createAccessToken({ id: newUser._id });
      // const refreshtoken = createRefreshToken({ id: newUser._id });

      // res.cookie("refreshtoken", refreshtoken, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      // });

      // res.json({ accesstoken });

      // --------------- Register Email ---------------
      // const activationtoken = createActivationToken(newUser);

      // const url = `${CLIENT_URL}/user/activate/${activationtoken}`;
      // sendMail(email, url, "Verify your email to active account. Thanks you!");

      // res.json({
      //   msg: "Wellcome u with us, please check your email to activate account",
      // });
      // --------------- /Register Email ---------------
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activation: async (req, res) => {
    try {
      const { activationtoken } = req.body;
      const user = jwt.verify(
        activationtoken,
        process.env.ACTIVATE_TOKEN_SECRET
      );

      const { name, email, address, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email is already exist!" });

      const newUser = new Users({
        name,
        email,
        password,
        address,
      });
      await newUser.save();

      //After activate create accesstoken to authenticate
      //Using jwt to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ msg: "Account has been activated!", accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Sign in failed. Please try again!" });

      // If login success, create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logout success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please login or register" });
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, newPassword } = req.body;
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ msg: "New password must be least 6 character" });
      const user = await Users.findOne({ _id: req.user.id });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Password is wrong. Unable change pass" });

      const passwordHash = await bcrypt.hash(newPassword, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "Password has change successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist!" });

      const accesstoken = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${accesstoken}`;
      sendMail(
        email,
        url,
        "Re-send the password, please check your email to change"
      );

      res.json({
        msg: "Re-send the password, please check your email to change",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "Password has change successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, email, address, phone, role, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "The email is already exist" }); //Check exist
      }
      //Check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });
      //Encode password
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        address,
        password: passwordHash,
        phone,
        role,
      });
      // ---------This code for register basic------------
      //Save on cloud MongoDB
      await newUser.save();

      //Using jwt to authentication
      // const accesstoken = createAccessToken({ id: newUser._id });
      // const refreshtoken = createRefreshToken({ id: newUser._id });

      // res.cookie("refreshtoken", refreshtoken, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      // });

      // res.json({ msg: "Create account successfully!", accesstoken });

      // const activationtoken = createActivationToken(newUser);

      // const url = `${CLIENT_URL}/user/activate/${activationtoken}`;
      // sendMail(email, url, "Verify your email to active account. Thanks you!");

      // res.json({
      //   msg: "Wellcome u with us, please check your email to activate account",
      // });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      // if (password) {
      //   if (password.length < 6)
      //     return res
      //       .status(400)
      //       .json({ msg: "Password is at least 6 characters" });
      //   var passwordHash = await bcrypt.hash(password, 12);
      //   return passwordHash;
      // }
      // console.log(passwordHash);

      // if (!password)
      //   return res.status(400).json({ msg: "Please confirm password!" });
      // if (password.length < 6)
      //   return res
      //     .status(400)
      //     .json({ msg: "Password is at least 6 characters" });
      // const passwordHash = await bcrypt.hash(password, 12);
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          address,
          phone,
        }
      );
      res.json({ msg: "Update infomation successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAllUsers: async (req, res) => {
    try {
      const { name, address, phone, role } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          address,
          phone,
          role,
        }
      );
      res.json({ msg: "Update infomation user successfully}!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUsers: async (req, res) => {
    try {
      await Users.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Delete account user successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addtoCart: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Add to cart successfully" });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  orderInfo: async (req, res) => {
    try {
      const orderInfo = await Orders.find({ user_id: req.user.id });
      res.json(orderInfo);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
};

const createActivationToken = (user) => {
  return jwt.sign(user.toJSON(), process.env.ACTIVATE_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
