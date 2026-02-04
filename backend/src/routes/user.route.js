import {Router} from 'express';
import {registerUser,loginUser,logoutUser, getAllUsers} from '../controllers/user.controller.js'
const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser);
userRouter.route('/getusers').get(getAllUsers);
export default userRouter