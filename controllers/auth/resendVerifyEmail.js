const dotenv = require("dotenv");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

dotenv.config();

const { DOMAIN } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const data = {
    to: email,
    subject: "Varification",
    html: `<a href="${DOMAIN}/api/auth/verify/${user.verificationToken}" target="_blank">Please, press the button</a>`,
  };
  await sendEmail(data);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
