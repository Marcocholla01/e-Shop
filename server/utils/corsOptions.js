const whitelist = ["https://shop0-bice.vercel.app", process.env.FRONTEND_URL];

// Add the environment variable to the whitelist
if (process.env.FRONTEND_URL) {
  whitelist.push(process.env.FRONTEND_URL);
}

const origin = (origin, callback) => {
  if (whitelist.indexOf(origin)) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

const corsOptions = {
  origin: origin,
  credentials: true, // This allows cookies and other credentials to be sent in cross-origin requests
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = corsOptions;
