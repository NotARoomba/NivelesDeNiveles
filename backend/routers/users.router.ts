import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/user';

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.post('/', async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    if (collections.users) {
      await collections.users.updateOne({number: data.number}, data, {
        upsert: true,
      });
    }
    res.status(200).send({error: false, msg: 'Updated User!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});

usersRouter.get('/:number', async (req: Request, res: Response) => {
  const id = req?.params?.number;

  try {
    const query = {number: parseInt(id, 10)};
    let user = null;
    if (collections.users) {
      user = (await collections.users.findOne(query)) as unknown as User;
    }
    if (user) {
      res.status(200).send({user, error: false, msg: 'The user exists!'});
    } else {
      res.status(404).send({user: null, error: true, msg: 'User not found!'});
    }
  } catch (error) {
    res.status(404).send({user: null, error: true, msg: error});
  }
});
