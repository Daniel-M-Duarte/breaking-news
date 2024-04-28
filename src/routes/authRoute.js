import { Router } from 'express';
import login from '../controller/authController.js';

const authRouter = Router();

authRouter.post('/', login);

export default authRouter;