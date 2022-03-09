import AuthController from  "./auth.controller";
import catchAsynError from '../../exception/catchAsyncError';

import { validateSignup } from "./auth.validation";
const router = require("express").Router();


router.post(
  "/signup",
  validateSignup,
  catchAsynError(AuthController.signUp)
);

export default router;
