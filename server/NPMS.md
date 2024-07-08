## BACKEND

```js
npm i bcrypt body-parser cookie-parser cookie-session cors dotenv express jsonwebtoken mongoose multer nodemailer nodemon passport passport-google-oauth20 stripe uuid
```

## FRONTEND

```js
npm i react-router-dom react-lottie react-icons country-state-city axios
```

## SOCKET

```js
npm i cors dotenv express nodemon socket.io
```

# Generate Random string for .env

> Step 1 Type `node` in console

> Step 2 Type `require("crypto").randomBytes(length).toString("base64");`

```js
require("crypto").randomBytes(128).toString("base64");
```
