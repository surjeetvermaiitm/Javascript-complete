import { StatusCodes } from 'http-status-codes';
import UserService from "../services/user-service.js";
import { successResponse, errorResponse } from "../utils/common/index.js";
const userService = new UserService();

export const signup = async (req, res) => {
    try {
        const response = await userService.signup(
            {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            }
        )
        successResponse.data = response;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.err = { name: error.name, message: error.message }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

export const login = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(
            req.body.email,
            req.body.password
        );
        const token = user.genJWT();
        successResponse.data = {user: user, token: token};
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.err = { name: error.name, message: error.message }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}


const indexExports = {
    signup,
    login
}

export default indexExports;