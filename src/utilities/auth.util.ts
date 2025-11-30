import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'satoshi_nakamoto';
const JWT_EXPIRES_IN = '24h';

export const hashPassword = async (plainPassword: string): Promise<string> => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.log(`Error at [AuthController :: hashPassword], err: ${err}`);
        throw err;
    }
};

export const generateToken = (userId: string): string => {
    try {
        const authToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return authToken;
    } catch (err) {
        console.log(`Error at [AuthController :: generateToken], err: ${err}`);
        throw err;
    }
}