const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().required().equal(Joi.ref("password")),
});

const loginScmema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginScmema,
};
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
