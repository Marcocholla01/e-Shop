const nodemailer = require(`nodemailer`);

const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

const sendMail = async (options) => {
  const transpoter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: options.from,
    reply: options.reply,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendMail;
