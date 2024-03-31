const express = require(`express`);
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const path = require("path");
const cookieSession = require(`cookie-session`);
const passport = require(`passport`)

app.get(`/`, (req, res) => {
  res.send(`Hello From the Backend Server`);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["token"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: [
      "https://shop0-bice.vercel.app",
      "http://192.168.1.100:1001",
      "http://localhost:1001",
      "http://127.0.0.1:1001",
    ],

    credentials: true,
  })
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
const user = require(`./controller/user`);
const shop = require(`./controller/shop`);
const product = require(`./controller/Product`);
const event = require(`./controller/event`);
const couponCode = require(`./controller/couponCode`);
const payment = require(`./controller/payment`);
const order = require(`./controller/order`);
const withdraw = require(`./controller/withdraw`);
const conversation = require(`./controller/conversation`);
const message = require(`./controller/message`);
const contactForm = require(`./controller/contactForm`);

app.use(`/api/v2/user`, user);
app.use(`/api/v2/shop`, shop);
app.use(`/api/v2/product`, product);
app.use(`/api/v2/event`, event);
app.use(`/api/v2/couponCode`, couponCode);
app.use(`/api/v2/payment`, payment);
app.use(`/api/v2/order`, order);
app.use(`/api/v2/withdraw`, withdraw);
app.use(`/api/v2/conversation`, conversation);
app.use(`/api/v2/message`, message);
app.use(`/api/v2/contactForm`, contactForm);

// not found route
app.all("*", (req, res) => {
  res.status(404).send("This Page is not found");
});
// For error handling
app.use(ErrorHandler);

module.exports = app;
