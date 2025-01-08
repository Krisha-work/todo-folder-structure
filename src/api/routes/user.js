import express from 'express';
import verifyToken from '../../middleware/auth.js';
import { register, login, logout_user, update_user } from '../controllers/user.js';

const user = express.Router();

user.post('/register', register);
user.post('/login', login);

user.use(verifyToken);
user.put('/user/:id', update_user )
user.delete('/logout/:id',logout_user)

export default user;