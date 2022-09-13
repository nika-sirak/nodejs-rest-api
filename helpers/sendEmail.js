const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();

const { SENDGRID_API_KEY, EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: EMAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
