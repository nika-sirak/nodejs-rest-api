const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const data = {
    to: email,
    subject: "Varification",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Please, press the button</a>`,
  };
  await sendEmail(data);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = register;
