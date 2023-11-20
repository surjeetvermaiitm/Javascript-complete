import { config } from 'dotenv';

config();

const MONGODB_URL = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_ACCESS_SECRET_KEY = process.env.AWS_ACCESS_SECRET_KEY
const AWS_REGION = process.env.AWS_REGION
const BUCKET_NAME = process.env.BUCKET_NAME

export {
    MONGODB_URL,
    JWT_SECRET,
    AWS_ACCESS_KEY,
    AWS_ACCESS_SECRET_KEY,
    AWS_REGION,
    BUCKET_NAME
}