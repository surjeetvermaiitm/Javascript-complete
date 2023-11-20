import {UserRepository} from '../repositories/index.js'
import ApiError from "../utils/Error/ApiError.js";
import StatusCodes from 'http-status-codes'

class UserService {
    constructor(){
        this.userRepository = new UserRepository()
    }
    async signup(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
           throw new ApiError(StatusCodes.BAD_REQUEST, "No User Found!")
        }
    }

    async getUserByEmail(email, password){
        try{
            const user = await this.userRepository.getBy(email);
            if(!user){
                throw new ApiError(StatusCodes.NOT_FOUND, "user or password is invalid");
            }
            if(await !user.comparePassword(password)){
                throw new ApiError(StatusCodes.NOT_FOUND, "password is invalid");
            }
            return user;
        } catch(error) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user or password");
        }
    }

}


export default UserService;