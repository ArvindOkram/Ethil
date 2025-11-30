import {
    Request,
    Response
} from 'express'
import authService from '../services/auth.service';
import { HttpStatusCode } from '../commons/enums/http-status.enum';

const login = async (req: Request, res: Response) => {
    try {
        const request = req.body
        const response = await authService.login(request);
        res.status(HttpStatusCode.OK).send(response);
    } catch (err: any) {
        console.log(`Error at [AuthController :: login], err: ${err}`);
        return res.status(500).send({
            message: err.message
        })
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const request = req.body
        const response = await authService.logout(request);
        return res.status(HttpStatusCode.CREATED).send(response);
    } catch (err: any) {
        console.log(`Error at [AuthController :: logout], err: ${err}`);
        return res.status(500).send({
            message: err.message
        })
    }
}

const signUp = async (req: Request, res: Response) => {
    try {
        const request = req.body;
        const response = await authService.signUp(request);
        return res.status(HttpStatusCode.CREATED).send(response);
    } catch (err: any) {
        console.log(`Error at [AuthController :: signUp], err: ${err}`);
        return res.status(500).send({
            message: err.message
        })
    }
}

export default {
    login,
    logout,
    signUp
}