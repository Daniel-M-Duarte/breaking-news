import { Router } from 'express';
import { create, findAll } from '../controller/newsController.js';

const newsRouter = Router();

newsRouter.post('/', create);
newsRouter.get('/', findAll);

export default newsRouter;