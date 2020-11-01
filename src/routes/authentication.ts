import { Router } from 'express';
import { login, signup } from '../api/authentication';

const authenticationRouter = Router();

authenticationRouter.post('/login', login);
authenticationRouter.post('/signup', signup);

export default authenticationRouter;
