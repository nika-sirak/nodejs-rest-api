const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

dotenv.config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!user || !comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw RequestError(403, "Please, varify your email");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
