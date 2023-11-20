import express from "express";

import {LikeController, CommentController, AuthController } from "../../controllers/index.js";
import TweetRoute from './tweet-route.js'
import {authenticate} from '../../middlewares/authenticate.js'
const router = express.Router();

router.use('/tweets', TweetRoute);
router.post('/likes/toggle', LikeController.toggleLike);
router.post('/comments', authenticate, CommentController.createComment);
router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
export default router;