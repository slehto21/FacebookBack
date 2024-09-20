import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const expiresIn = '1h';

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    
    return jwt.sign(payload, secretKey, { expiresIn });
    };

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
};