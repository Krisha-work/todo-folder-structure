import express from 'express';
import verifyToken from '../../middleware/auth.js';
import { register, userLogin, updateUser, logoutUser, userShow } from '../controllers/user.js';

const user = express.Router();

user.post('/register', register);
user.post('/login', userLogin);

user.use(verifyToken);
user.get('/userdata', userShow)
user.put('/user/:id', updateUser )
user.delete('/logout/:id',logoutUser)

export default user;