import mongoose from 'mongoose';
import { MONGODB_URL } from './serverConfig.js';

export const connect = async() => {
    await mongoose.connect(MONGODB_URL);
}


export default connect;
