const nodemailer = require(`nodemailer`);

const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });

const sendMail = async (options) => {
  
  const transpoter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ,
    port: process.env.SMTP_PORT ,
    secure: true,
    service: process.env.SMTP_SERVICE ,
    auth: {
      user: process.env.SMTP_MAIL ,
      pass: process.env.SMTP_PASSWORD ,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL ,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendMail;
