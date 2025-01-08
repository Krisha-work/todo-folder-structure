import express from 'express'
import user from './routes/user.js';
import app from './routes/todo.js';

const apiRouter = express.Router();

apiRouter.use('/user', user);
apiRouter.use('/todo', app)

export default apiRouter;