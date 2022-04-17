import { body, check } from 'express-validator';

export const validateUser = [
    check('firstName').isLength({ min: 2}).withMessage('firstname too short'),
    check('lastName').isLength({ min: 2}).withMessage('lastname too short'),
    check('email').isEmail().normalizeEmail(),
    check('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long'),
    check('confirmPassword').matches('password').withMessage('passsword mismatch')
];

export const validateUserProfile = [
    body('firstName').isLength({ min: 2}).withMessage('firstname too short'),
    body('lastName').isLength({ min: 2}).withMessage('lastname too short'),
    body('interest').isArray({ min: 1}).withMessage('Must have at least one interest')
    .isLength({ min: 2}).withMessage("Must not be ehjghghjghjgmpty")
];


