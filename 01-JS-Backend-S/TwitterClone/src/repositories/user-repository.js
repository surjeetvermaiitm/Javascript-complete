import User from "../models/user.js";
import ApiError from "../utils/Error/ApiError.js";
import CrudRepository from "./crud-repository.js";
import {StatusCodes} from 'http-status-codes'


class UserRepository extends CrudRepository{
    constructor(){
        super(User)
    }

    async getBy(email){
        try {
            const response = await User.findOne({email});
            return response;
        } catch (error) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Bad Request")
        }
    }
}

export default UserRepository;