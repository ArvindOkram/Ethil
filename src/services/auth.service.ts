import bcrypt from 'bcrypt';
import { IUser } from '../commons/interface/user.interface';
import { LoginRequest, LogoutRequest, SignUpRequest } from '../models/request/auth.request';
import { GenericReponse, LoginResponse } from '../models/response/auth.response';
import { createUser, getUser } from '../repositories/user.repository';
import { generateToken, hashPassword } from '../utilities/auth.util';

/**
 * Validate user existance and password
 * @param loginRequest 
 * @returns JWT token
 */
const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    try {
        const { phone_number, password } = loginRequest;

        const user = await getUser({ phone_number });

        if (!user) {
            throw new Error('Invalid credentials'); // need to throw 4xx
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken(user._id.toString());

        /* 
        TODO:
        1. add refresh token mechanism
        2. store tokens in DB with expiry details
        3. implement token blacklist for logout
        4. implement token renewal endpoint
        5. enhance security with additional claims 
        */
        return { token };
    } catch (err: any) {
        console.log(`Error at [AuthService :: login], err: ${err}`);
        throw err;
    }
}

/**
 * Validate user existance 
 * @param logoutRequest 
 * @returns logout message
 */
const logout = async (logoutRequest: LogoutRequest): Promise<GenericReponse> => {
    try {
        //Token to be deleted by client
        const phoneNumber = logoutRequest.phone_number;

        const user = await getUser({ phone_number: phoneNumber });

        if (!user) {
            throw new Error(`User with ${phoneNumber} not found`); // need to throw 4xx
        }
        /*
        TODO:
        1. add refresh token mechanism
        2. store tokens in DB with expiry details
        3. implement token blacklist for logout
        **/

        return { message: `Logout successfully for ${phoneNumber}` };
    } catch (err: any) {
        console.log(`Error at [AuthService :: logout], err: ${err}`);
        throw err;
    }
}

/**
 * Validate user existance and 
 * create user if not exists in DB
 * @param signUpRequest 
 * @returns successful msg
 */
const signUp = async (signUpRequest: SignUpRequest): Promise<GenericReponse> => {
    try {
        const { name, phone_number: phoneNumber, password } = signUpRequest;

        const user = await getUser({ phoneNumber });
        if (user) {
            console.warn(`Duplicate registration request received`);
            return {
                message: `Phone number ${phoneNumber} already used`
            }
        }


        const userData: IUser = {
            name,
            phone_number: phoneNumber,
            password: await hashPassword(password),
        }

        await createUser(userData);

        return {
            message: `Sign up successful for ${phoneNumber}`
        };
    } catch (err: any) {
        console.log(`Error at [AuthService :: signUp], err: ${err}`);
        throw err;
    }
}

export default {
    login,
    logout,
    signUp
}