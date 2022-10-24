import bcrypt = require('bcryptjs');
import users from '../database/models/users';
import ILogin from '../interfaces/Login';

class LoginService {
  public login = async (login: ILogin) => {
    const { email, password } = login;

    const user = await users.findOne({ where: { email } });
    if (!user) return undefined;

    const result = await bcrypt.compare(password, user.password);
    if (!result) return undefined;

    return user;
  };
}

export default LoginService;
