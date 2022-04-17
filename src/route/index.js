import { Router } from 'express';
import authRoute from '../modules/auth/auth.route';
import profileRoute from '../modules/user/user.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/profile', profileRoute);

export default router;
