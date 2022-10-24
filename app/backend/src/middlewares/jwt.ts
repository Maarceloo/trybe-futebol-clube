import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'senhaSecreta';

const jwtCreate = (payload: object): string => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const jwtValidate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log(decoded);
    req.body = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { jwtCreate, jwtValidate };