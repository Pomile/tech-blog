import AuthController from  "./auth.controller";
import catchAsynError from '../../exception/catchAsyncError';

import { validateSignup, validateLogin, validateConfirmEmail, validateEmail } from "./auth.validation";
const router = require("express").Router();


router.post(
  "/signup",
  validateSignup,
  catchAsynError(AuthController.signUp)
);

router.post(
  "/login",
  validateLogin,
  catchAsynError(AuthController.login)
);

router.post(
  "/verify-email",
  validateConfirmEmail,
  catchAsynError(AuthController.confirmEmail)
);

router.post(
  "/generate/password-reset-link",
  validateEmail,
  catchAsynError(AuthController.generatePasswordResetToken)
);

router.post(
  "/password-reset/token",
  validateConfirmEmail,
  catchAsynError(AuthController.verifyPasswordResetToken)
);
  
export default router;
