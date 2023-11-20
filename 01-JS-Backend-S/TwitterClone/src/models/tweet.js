import { Schema, model } from 'mongoose';


const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
        max: [250, "Tweet Cannot be more than 250 characters"]
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    image: {
        type: String
    }

},
    {
        timestamps: true
    }
);


const Tweet = model('Tweet', tweetSchema);

export default Tweet;