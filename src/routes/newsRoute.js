import { Router } from 'express';
import { create, findAll, topNews, findById, searchByTitle, byUser } from '../controller/newsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validId } from "../middleware/globalMiddleware.js";

const newsRouter = Router();

newsRouter.post("/", authMiddleware, create);
newsRouter.get('/', findAll);
newsRouter.get('/top', topNews);
newsRouter.get('/search', searchByTitle);
newsRouter.get('/byUser', authMiddleware, byUser);
newsRouter.get('/:id', authMiddleware, validId, findById);

export default newsRouter;