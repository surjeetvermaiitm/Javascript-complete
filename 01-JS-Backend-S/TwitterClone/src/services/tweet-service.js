import { StatusCodes } from 'http-status-codes';
import { TweetRepository, HashtagRepository } from '../repositories/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        let tags = content.match(/#\w+/g);
        tags = tags?.map((tag) => tag.substring(1));
        
        const tweet = await this.tweetRepository.create(data);
        
        let alreadyPresentTags = await this.hashtagRepository.getByName(tags);
        let titleOfPresent = alreadyPresentTags.map((tag) => tag.title)
        let newTags = tags?.filter(tag => { return !titleOfPresent.includes(tag) });
        newTags = newTags?.map(tag => {
            return { title: tag, tweets: [tweet.id] }
        });
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets?.push(tweet.id);
            tag.save();
        })

        return tweet;
    }

    async get(id){
            const tweet = await this.tweetRepository.getWithComments(id);
            return tweet;
    }

}


export default TweetService;