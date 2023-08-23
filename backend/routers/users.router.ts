import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/user';

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    let scores: User[] = [];
    if (collections.users) {
      scores = (await collections.users
        .find({})
        .toArray()) as unknown as User[];
    }
    res.status(200).send({scores, error: false, msg: 'Users Exist!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});
usersRouter.post('/add', async (req: Request, res: Response) => {
  const data: User = req.body;
  let scores: User[] = [];
  try {
    if (collections.users) {
      await collections.users.insertOne(data);
      scores = (await collections.users
        .find({})
        .toArray()) as unknown as User[];
    }
    res.status(200).send({scores, error: false, msg: 'Inserted User!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});
usersRouter.post('/remove', async (req: Request, res: Response) => {
  const number: string = req.body.number;
  try {
    if (collections.users) {
      await collections.users.deleteOne({number});
    }
    res.status(200).send({error: false, msg: 'Removed User!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});
