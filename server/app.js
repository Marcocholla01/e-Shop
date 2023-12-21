const express = require(`express`);
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const path = require("path");

app.get(`/`, (req, res) => {
  res.send(`Hello From the Backend Server`);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:1001",
    credentials: true,
  })
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
const user = require(`./controller/user`);
const shop = require(`./controller/shop`);
const product = require(`./controller/product`);
const event = require(`./controller/event`);
const couponCode = require(`./controller/couponCode`);

app.use(`/api/v2/user`, user);
app.use(`/api/v2/shop`, shop);
app.use(`/api/v2/product`, product);
app.use(`/api/v2/event`, event);
app.use(`/api/v2/couponCode`, couponCode);

// not found route
app.all("*", (req, res) => {
  res.status(404).send("This Page is not found");
});
// For error handling
app.use(ErrorHandler);

module.exports = app;
