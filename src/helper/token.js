import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { APP_SECRET, TOKEN_EXPIRATION } = process.env;


exports.generateToken = (data) => {
    const token = jwt.sign(data, APP_SECRET, { expiresIn: TOKEN_EXPIRATION });
    return token;
}