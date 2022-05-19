const { validationResult } = require('express-validator');

export const validateResult = (req) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'ValidationException', errors: errors.array() });
        }
}