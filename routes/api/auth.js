const express = require("express");

const validationData = require("../../middlewares/contactValidation");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  registSchemaJoi,
  loginSchemaJoi,
  updateSubJoi,
} = require("../../schemas/user");
const {
  registerController,
  loginController,
  getCurrent,
  logoutController,
  updateSubController,
} = require("../../controllers/authController");
const verifyerToken = require("../../middlewares/verifyerToken");
const router = express.Router();

router.post(
  "/signup",
  validationData(registSchemaJoi),
  ctrlWrapper(registerController)
);

router.post(
  "/login",
  validationData(loginSchemaJoi),
  ctrlWrapper(loginController)
);

router.get("/current", verifyerToken, ctrlWrapper(getCurrent));

router.get("/logout", verifyerToken, ctrlWrapper(logoutController));

router.patch(
  "/subscription",
  verifyerToken,
  validationData(updateSubJoi),
  ctrlWrapper(updateSubController)
);

module.exports = router;
