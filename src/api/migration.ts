import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { database } from 'migrate-mongo';
import User from '../models/user';

export const migrateUp = async (req: Request, res: Response) => {
  let token = req.headers.authorization;
  if (req.body.migration === undefined) {
    res.status(401).json({ message: 'Missing payload migration' });
  } else if (token) {
    [, token] = token.split(' ');
    const decoded: any = verify(token, 'djMpZ}M]µu0Q$it]X$#!H[1£E{c/ù£qFP^D°O)B+$}');
    if (decoded.username !== undefined && decoded.username === 'Administrator') {
      const { db, client } = await database.connect();
      await db.collection('users').updateMany({}, { $set: req.body.migration });
      await client.close();
      res.status(200).json({ message: 'Migration done succesfully' });
    } else {
      res.status(403).json({ message: 'Forbidden to migrate database' });
    }
  } else {
    res.status(401).json({ message: 'Missing authorisation token' });
  }
};

export const migrateDown = async (req: Request, res: Response) => {
  let token = req.headers.authorization;
  if (req.body.migration === undefined) {
    res.status(401).json({ message: 'Missing payload migration' });
  } else if (token) {
    [, token] = token.split(' ');
    const decoded: any = verify(token, 'djMpZ}M]µu0Q$it]X$#!H[1£E{c/ù£qFP^D°O)B+$}');
    if (decoded.username !== undefined && decoded.username === 'Administrator') {
      const { db, client } = await database.connect();
      await db.collection('users').updateMany({}, { $unset: req.body.migration });
      await client.close();
      res.status(200).json({ message: 'Migration done succesfully' });
    } else {
      res.status(403).json({ message: 'Forbidden to migrate database' });
    }
  } else {
    res.status(401).json({ message: 'Missing authorisation token' });
  }
};

export const migrationGet = (req: Request, res: Response) => {
  let token = req.headers.authorization;
  if (token) {
    [, token] = token.split(' ');
    const decoded: any = verify(token, 'djMpZ}M]µu0Q$it]X$#!H[1£E{c/ù£qFP^D°O)B+$}');
    if (decoded.username !== undefined && decoded.username === 'Administrator') {
      User.find()
        .exec()
        .then((users: Array<object> | null): void => {
          res.status(200).json(users);
        })
        .catch((err: Error) => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(403).json({ message: 'Forbidden to migrate database' });
    }
  }
};
