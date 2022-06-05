import AuthController from  "./auth.controller";
import catchAsynError from '../../exception/catchAsyncError';

import { 
  validateSignup,
  validateLogin,
  validateConfirmEmail,
  validateEmail,
  validatePasswordReset 
} from "./auth.validation";
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

router.get(
  "/google",
  catchAsynError(AuthController.getGoogleOAuthUrl)
);

router.get(
  "/facebook",
  catchAsynError(AuthController.getFacebookOAuthUrl)
);

router.get(
  "/google/callback",
  catchAsynError(AuthController.googleOAuthCallback)
);

router.get(
  "/facebook/callback",
  catchAsynError(AuthController.facebookOAuthCallback)
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

router.post(
  "/password-reset",
  validatePasswordReset,
  catchAsynError(AuthController.resetPassword)
);
  
export default router;
