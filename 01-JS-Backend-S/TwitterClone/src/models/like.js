import { Schema, model } from "mongoose";

const likeSchema = new Schema({
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    likeable: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timeseries: true
    }
)


const Like = model('Like', likeSchema);

export default Like;