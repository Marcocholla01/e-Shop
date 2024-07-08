const express = require(`express`);
const errorHandler = require("./middlewares/Error");
const app = express();
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const path = require("path");
const corsOptions = require(`./utils/corsOptions`);

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.get(`/`, (req, res) => {
  res.send(`Hello From the Backend Server`);
});

// not found route
app.all("*", (req, res) => {
  res.status(404).send("This Page is not found");
});
// For error handling
app.use(errorHandler);

module.exports = app;
