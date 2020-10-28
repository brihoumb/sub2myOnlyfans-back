import express from 'express';
import verification from '../middleware/verifyAuth';
import { all, login, signup } from '../api/authentication';

const authenticationRouter = express.Router();

authenticationRouter.post('/login', login);
authenticationRouter.post('/signup', signup);
authenticationRouter.get('/', verification, all);

export default authenticationRouter;
