import { check } from 'express-validator';

export const validateUser = [
    check('firstName').isLength({ min: 2}).withMessage('firstname too short'),
    check('lastName').isLength({ min: 2}).withMessage('lastname too short'),
    check('email').isEmail().normalizeEmail(),
    check('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long'),
    check('confirmPassword').matches('password').withMessage('passsword mismatch')
];
