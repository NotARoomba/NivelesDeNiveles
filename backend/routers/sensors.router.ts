import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/sensor';
import Sensor from '../models/sensor';
import STATUS_CODES from '../models/status';

export const sensorsRouter = express.Router();

sensorsRouter.use(express.json());

sensorsRouter.get('/', async (req: Request, res: Response) => {
  try {
    let sensors: Sensor[] = [];
    if (collections.sensors) {
      sensors = (await collections.sensors
        .find({})
        .toArray()) as unknown as Sensor[];
    }
    res.send({sensors, status: STATUS_CODES.SUCCESS});
  } catch (error) {
    res.send({status: STATUS_CODES.GENERIC_ERROR});
  }
});
//for sensors to send data
sensorsRouter.post('/', async (req: Request, res: Response) => {
  const data: Sensor = req.body;
  try {
    if (collections.sensors) {
      await collections.sensors.updateOne(
        {name: data.name},
        {$set: data},
        {
          upsert: true,
        },
      );
    }
  } catch (error) {
    res.send({status: STATUS_CODES.GENERIC_ERROR});
  }
});
