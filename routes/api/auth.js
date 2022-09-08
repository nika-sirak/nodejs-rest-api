const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validationBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validationBody(schemas.verifyEmailScmema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  "/login",
  validationBody(schemas.loginScmema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
