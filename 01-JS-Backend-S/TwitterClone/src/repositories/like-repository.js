import Like from "../models/like.js";
import ApiError from "../utils/Error/ApiError.js";
import CrudRepository from "./crud-repository.js";
import {StatusCodes} from 'http-status-codes'
class LikeRepository extends CrudRepository{
    constructor(){
        super(Like)
    }

    async findByUserAndLikeable(data){
        try {
            const like = await Like.findOne(data);
            return like;
        } catch (error) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Data Not found")
        }
    }
}


export default LikeRepository;