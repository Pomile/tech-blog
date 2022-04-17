import userService from './user.service';
const { validationResult } = require('express-validator');
class UserController{

    /**
     * @description Update user profile
     * @param {object} req 
     * @param {object} res 
     */
    static async updateProfile(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false, 
                message: 'ValidationException', 
                errors: errors.array() 
            });
        }

        const profile = await userService.updateUserProfile(req.body, req.auth);
        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            profileMetaData: profile
        })
    }


    /**
     * @description Get user profile
     * @param {object} req 
     * @param {object} res 
     */

    static async getUserProfile(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false, 
                message: 'ValidationException', 
                errors: errors.array() 
            });
        }

        const profile = await userService.getUserProfile(req.auth);
        return res.status(200).json({
            success: true,
            profile
        })
    }

}

export default UserController;