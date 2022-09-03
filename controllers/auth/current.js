const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const current = async (req, res) => {
  const { _id, email, subscription } = req.user;

  const user = await User.find({ _id });
  if (!user) {
    throw RequestError(401, "Not authorized");
  }

  res.json({
    email,
    subscription,
  });
};

module.exports = current;
