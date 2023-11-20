import { StatusCodes } from 'http-status-codes';

import { successResponse, errorResponse } from "../utils/common/index.js";
import CommentService from '../services/comment-service.js';

const commentService = new CommentService();


export const createComment = async (req, res) => {
    try {
        const response = await commentService.createComment(
            req.query.modelId,
            req.query.modelType,
            req.user.id,
            req.body.content
        )
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.err = {name: error.name, message: error.message};
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}


const indexExports = {
    createComment
}

export default indexExports;