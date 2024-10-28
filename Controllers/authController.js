const Client = require("../models/user.module");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../middlewares/async");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const OrderModule = require("../models/Order.module");

//@description    Get login page
//@route          GET/Login
//@access         Public
exports.getLoginPage = (req, res) => {
  const { email, password } = req.body;
  res.render("../views/auth/login.ejs", {
    title: "Login",
    errormessage: "",
    oldinput: { email, password } || {},
  });
};
//@description    Get register page
//@route          GET/registration
//@access         Public
exports.getRegisterPage = async (req, res) => {
  const { email, name, password, password2 } = req.body;
  res.render("../views/auth/register.ejs", {
    title: "Register",
    errormessage: "",
    oldinput: { email, name, password, password2 },
  });
};
//@description    Register new user
//@route          POST/login
//@access         Public
exports.createNewUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, name, password, password2 } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render("auth/register", {
        title: "Register",
        errormessage: errors.array()[0].msg,
        oldinput: { email, name, password, password2 },
      });
    }
    const userExist = await Client.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(404).render("auth/register", {
        title: "Register",
        errormessage: "This email is already registrated",
        oldinput: { email, name, password, password2 },
      });
    }
    if (password !== password2) {
      return res.status(404).render("auth/register", {
        title: "Register",
        errormessage: "Passwords aren't matched",
        oldinput: { email, name, password, password2 },
      });
    }
  } catch (error) {
    console.log(error);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await Client.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  res.redirect("/login");
});

//@description    Login user
//@route          POST/orders
//@access         Public

exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const oldinput = { email, password };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).render("auth/login", {
        title: "Login",
        errormessage: errors.array()[0].msg,
        oldinput: oldinput,
      });
    }
    const userExist = await Client.findOne({ email: req.body.email });
    if (userExist) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      if (matchPassword) {
        req.session.user = userExist;
        await req.session.save();

        userId = req.session.user._id;
        const element = await Cart.find();
        
        if (element.length > 0) {
          if (element[0].client.toHexString() === "01234567890123456789aaaa") {
            await Cart.updateMany({}, { $set: { client: userId } });
          }
          const MyCart = await Cart.find();
          await OrderModule.insertMany(MyCart);
          await Cart.deleteMany({});
          const orders = await OrderModule.find({ client: userId });

          const orderIds = orders.map((order) => order._id);

          await Client.findByIdAndUpdate(
            userId,
            { $addToSet: { Carts: { $each: orderIds } } },
            { new: true }
          );

          res.redirect("/orders");
        } else {
          res.redirect("/orders");
        }
      } else {
        return res.render("auth/login.ejs", {
          title: "Login",
          errormessage: "You entered invalid password ",
          oldinput: oldinput,
        });
      }
    } else {
      return res.render("auth/login.ejs", {
        title: "Login",
        errormessage: "This email isn't registrated ",
        oldinput: oldinput,
      });
    }
  } catch (error) {
    console.log(error);
  }
});


exports.validation = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("email").isEmail().withMessage("Please add a valid email"),
];
