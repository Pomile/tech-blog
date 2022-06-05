import { body } from 'express-validator';

export const validateSignup = [
    body('firstName').isLength({ min: 2}).withMessage('firstname too short'),
    body('lastName').isLength({ min: 2}).withMessage('lastname too short'),
    body('email').isEmail().normalizeEmail(),
    body('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      }),
];


export const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
];

export const validateEmail = [
    body('email').isEmail().normalizeEmail()
];

export const validateConfirmEmail = [
    body('token').notEmpty()
];

export const validatePasswordReset = [
    body('token').notEmpty(),
    body('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
    })
]
