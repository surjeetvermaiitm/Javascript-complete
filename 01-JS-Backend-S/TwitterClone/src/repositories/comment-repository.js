import Comment from "../models/comment.js";
import ApiError from "../utils/Error/ApiError.js";
import CrudRepository from "./crud-repository.js";
import {StatusCodes} from 'http-status-codes'


class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment)
    }
}

export default CommentRepository;