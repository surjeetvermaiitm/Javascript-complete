import { TweetRepository, LikeRepository, CommentRepository } from "../repositories/index.js";
import ApiError from "../utils/Error/ApiError.js";
import StatusCodes from 'http-status-codes'

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        if(modelType === 'Tweet') {
            var likeable = await this.tweetRepository.get(modelId);
        } else if(modelType === 'Comment'){
            likeable = await this.commentRepository.get(modelId);
        } else{
            throw new ApiError(StatusCodes.BAD_GATEWAY, "Unknown model type");
        }
        const data = {
            user: userId,
            onModel: modelType,
            likeable: modelId
        }
        const exist = await this.likeRepository.findByUserAndLikeable(data);
        if(exist){
            likeable.likes.pull(exist.id);
            await likeable.save();
            await this.likeRepository.destroy(exist._id);
            var isAdded = false;
        } else{
            const newLike = await this.likeRepository.create(data);
            likeable.likes.push(newLike);
            await likeable.save();
            isAdded = true;
        }
        return isAdded;
    }
}


export default LikeService;