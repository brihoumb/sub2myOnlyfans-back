import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user';

export const login = (req: Request, res: Response): void => {
  if (req.body === undefined
    || req.body.username === undefined
    || req.body.password === undefined) {
    res.status(400).json({ error: 'Missing parameter in body' });
    return;
  }
  User.findOne({ username: req.body.username }).exec()
    .then((user: any): void => {
      if (!user) {
        res.status(401).json({ error: 'Authentication failed' });
        return;
      }
      bcrypt.compare(req.body.password, user.password, (err: Error, result: boolean): any => {
        if (err !== undefined) {
          res.status(401).json({ error: 'Authentication failed' });
          return;
        }
        if (result) {
          const token = sign({
            username: user.username,
            userId: user.id,
          },
          'djMpZ}M]µu0Q$it]X$#!H[1£E{c/ù£qFP^D°O)B+$}',
          {
            expiresIn: '1d',
          });
          res.status(200).json({ message: 'Authentication successful', token });
          return;
        }
        res.status(401).json({ error: 'Authentication failed' });
      });
    })
    .catch((err: Error) => res.status(500).json({ error: err }));
};

export const signup = (req: Request, res: Response): void => {
  if (req.body === undefined
    || req.body.username === undefined
    || req.body.password === undefined) {
    res.status(400).json({ error: 'Missing parameter in body' });
    return;
  }
  User.findOne({ username: req.body.username }).exec()
    .then((newUser: any): any => {
      if (newUser !== null) {
        res.status(409).json({ error: 'Mail already exist' });
        return;
      }
      bcrypt.hash(req.body.password, 10, (err: Error, hash: string): void => {
        if (err !== undefined) {
          res.status(500).json({ error: err });
          return;
        }
        const user = new User({
          username: req.body.username,
          password: hash,
        });
        user.save()
          .then(() => res.status(201).json({ message: 'User created successfully' }))
          .catch((error: Error) => res.status(500).json({ error: `Unknown error: ${error}` }));
      });
    })
    .catch((err: Error) => res.status(500).json({ error: err }));
};
