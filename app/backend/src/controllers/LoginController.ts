import { Request, Response } from 'express';
import { jwtCreate } from '../middlewares/jwt';
import LoginService from '../services/LoginService';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userToken = await this.service.login({ email, password });

    if (!userToken) return res.status(401).json({ message: 'Incorrect email or password' });

    const { id, username, role } = userToken;
    const token = jwtCreate({ id, username, role });

    return res.status(200).json({ token });
  };

  public Validate = async (req: Request, res: Response) => {
    const { role } = req.body;
    return res.status(200).json({ role });
  };
}

export default LoginController;