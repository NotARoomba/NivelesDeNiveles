import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/user';
import STATUS_CODES from '../models/status';

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.post('/', async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    //need to check if user moved into a danger zone
    // maybe move that check into a function
    if (collections.users) {
      await collections.users.updateOne(
        {number: data.number},
        {$set: data},
        {
          upsert: true,
        },
      );
    }
    res.send({status: STATUS_CODES.SUCCESS});
  } catch (error) {
    res.send({status: STATUS_CODES.GENERIC_ERROR});
  }
});

usersRouter.get('/:number', async (req: Request, res: Response) => {
  const number = req?.params?.number;
  try {
    let user = null;
    if (collections.users) {
      user = (await collections.users.findOne({number})) as unknown as User;
    }
    if (user) {
      res.send({user, status: STATUS_CODES.SUCCESS});
    } else {
      res.send({user: null, status: STATUS_CODES.USER_NOT_FOUND});
    }
  } catch (error) {
    res.send({user: null, status: STATUS_CODES.GENERIC_ERROR});
  }
});
