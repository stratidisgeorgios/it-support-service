import {Router} from 'express';
import {createPost,deletePost,getAllPosts,updatePost} from '../controllers/post.controller.js'
const postRouter = Router();

postRouter.route('/create').post(createPost);
postRouter.route('/delete').post(deletePost);
postRouter.route('/update').patch(updatePost);
postRouter.route('/all').get(getAllPosts);
export default postRouter