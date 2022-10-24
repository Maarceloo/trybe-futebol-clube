import { Router } from 'express';
import { jwtValidate } from '../middlewares/jwt';
import LoginController from '../controllers/LoginController';
import LoginValidate from '../middlewares/Login.validate';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/', LoginValidate, loginController.Login);
loginRouter.get('/validate', jwtValidate, loginController.Validate);

export default loginRouter;
