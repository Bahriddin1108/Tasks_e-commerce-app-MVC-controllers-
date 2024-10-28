const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/db");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public1")));

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/Sessions", 
      ttl: 14 * 24 * 60 * 60, 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

dotenv.config();
connectDB();

app.use(require("./routes/auth.route"));
app.use(require("./routes/product.route"));
app.use(require("./routes/cart.route"));
app.use(require("./routes/order.route"));
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Working ${PORT}`);
});
