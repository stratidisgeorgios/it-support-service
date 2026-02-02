import {Router} from 'express';
import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js'
const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser);
export default userRouter