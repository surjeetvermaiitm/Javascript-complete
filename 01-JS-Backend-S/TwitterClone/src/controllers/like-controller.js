import { StatusCodes } from 'http-status-codes';

import { successResponse, errorResponse } from "../utils/common/index.js";
import LikeService from '../services/like-service.js';

const likeService = new LikeService();


export const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(
            req.query.modelId,
            req.query.modelType,
            req.body.userId
        )
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.err = {name: error.name, message: error.message};
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}


const indexExports = {
    toggleLike
}

export default indexExports;