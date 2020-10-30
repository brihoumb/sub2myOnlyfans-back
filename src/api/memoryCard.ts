import { Request, Response } from 'express';
import User from '../models/user';
import MemoryCard from '../models/memory';

export const save = (req: Request, res: Response): void => {
  if (req.body === undefined || req.body.username === undefined || req.body.save === undefined) {
    res.status(400).json({ error: 'Missing parameter in body' });
    return;
  }
  MemoryCard.findOne({ username: req.body.username }).exec()
    .then((saves: any): void => {
      if (!saves) {
        const saveInstance = new MemoryCard({
          username: req.body.username,
          savesList: saves.saves,
        });
        saveInstance.save()
          .then(() => res.status(201).json({ message: 'User created successfully' }))
          .catch((error: Error) => res.status(500).json({ error: `Unknown error: ${error}` }));
      }
    })
    .catch((err: Error) => res.status(500).json({ error: err }));
};

export const load = (req: Request, res: Response): void => {
  if (req.params === undefined || req.params.username === undefined) {
    res.status(400).json({ error: 'Missing parameter in request' });
    return;
  }
  User.findOne({ username: req.body.username }).exec()
    .then()
    .catch((err: Error) => res.status(500).json({ error: err }));
};
