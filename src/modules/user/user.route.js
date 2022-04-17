import UserController from  "./user.controller";
import catchAsynError from '../../exception/catchAsyncError';
import Auth from '../../middleware/authentication';

import { validateUserProfile } from "./user.validation";
const router = require("express").Router();

router.patch(
  "/",
  Auth.verify,
  validateUserProfile,
  catchAsynError(UserController.updateProfile)
);

router.get(
    "/",
    Auth.verify,
    catchAsynError(UserController.getUserProfile)
  );
  
export default router;
