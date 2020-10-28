import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verification = (req: Request,
  res: Response,
  next: NextFunction): any => {
  try {
    let token = req.headers.authorization;
    if (token) {
      [, token] = token.split(' ');
      const decoded = jwt.verify(token,
        'djMpZ}M]µu0Q$it]X$#!H[1£E{c/ù£qFP^D°O)B+$}');
      req.userData = decoded;
      next();
      return null;
    }
    return res.status(401).json({ message: 'Missing authorisation token' });
  } catch (error) {
    return res.status(401).json({ message: 'Authentification failed' });
  }
};

export default verification;
