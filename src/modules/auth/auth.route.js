import AuthController from  "./auth.controller";
import catchAsynError from '../../exception/catchAsyncError';

import { validateSignup, validateLogin } from "./auth.validation";
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
  
export default router;
