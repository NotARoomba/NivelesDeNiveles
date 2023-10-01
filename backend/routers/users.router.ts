import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/user';

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.post('/', async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    if (collections.users) {
      await collections.users.updateOne(
        {number: data.number},
        {$set: data},
        {
          upsert: true,
        },
      );
    }
    res.send({error: false, msg: 'Updated User!'});
  } catch (error) {
    res.send({error: true, msg: error});
  }
});

usersRouter.get('/:number', async (req: Request, res: Response) => {
  const number = req?.params?.number;
  try {
    let user = null;
    if (collections.users) {
      user = (await collections.users.findOne({number})) as unknown as User;
      console.log(user);
    }
    if (user) {
      res.send({user, error: false, msg: 'The user exists!'});
    } else {
      res.send({user: null, error: true, msg: 'User not found!'});
    }
  } catch (error) {
    res.send({user: null, error: true, msg: error});
  }
});
