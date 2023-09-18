import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/sensor';
import Sensor from '../models/sensor';

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
    res.send({sensors, error: false, msg: 'Got Sensor Data!'});
  } catch (error) {
    res.send({error: true, msg: error});
  }
});
sensorsRouter.post('/', async (req: Request, res: Response) => {
  const data: User = req.body;
  let sensors: Sensor[] = [];
  try {
    if (collections.sensors) {
      collections.sensors.createIndex({location: '2dsphere'});

      sensors = (await collections.sensors
        .find({
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: data.location,
              },
              $maxDistance: 2000,
            },
          },
        })
        .toArray()) as unknown as Sensor[];
      console.log(sensors);
    }
    res.send({sensors, error: false, msg: 'Got Risk!'});
  } catch (error) {
    res.send({error: true, msg: error});
  }
});