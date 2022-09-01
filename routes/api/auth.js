const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validationBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validationBody(schemas.loginScmema),
  ctrlWrapper(ctrl.login)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
