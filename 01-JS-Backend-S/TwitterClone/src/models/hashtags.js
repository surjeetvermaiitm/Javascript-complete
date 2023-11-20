import { Schema, model } from 'mongoose';

const hashtagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    tweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {
    timestamps: true
})


const Hashtag = model('Hashtag', hashtagSchema);

export default Hashtag;