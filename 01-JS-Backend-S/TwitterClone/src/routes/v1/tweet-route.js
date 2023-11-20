import express from "express";
const router = express.Router();

import { TweetController } from "../../controllers/index.js";

import upload from '../../config/file-upload-s3.js';
const singleUploader = upload.single('image');

router.post('/', TweetController.createTweet);
router.get('/:id', TweetController.getTweet);
export default router;