import express, {Request, Response} from 'express';
import {collections, getNotification, onesignal} from '../services/database.service';
import User from '../models/user';
import STATUS_CODES from '../models/status';
import haversine from 'haversine-distance';
import Incident from '../models/incident';
import { DangerLevel } from '../models/types';
import * as OneSignal from 'onesignal-node';

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.post('/', async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    //need to check if user moved into a danger zone
    // maybe move that check into a function later
    console.log(data, Date.now().toString());
    //need to check if currently in incident and then check if previous location is in incident
    if (data.location) {
      let incidents = (await collections.incidents
        ?.find({over: false})
        .toArray()) as unknown as Incident[];
      let currentIncidents = incidents.filter(
        incident =>
          haversine(
            {
              lat: data.location.coordinates[1],
              lon: data.location.coordinates[0],
            },
            {
              lat: incident.location.coordinates[1],
              lon: incident.location.coordinates[0],
            },
          ) < incident.range,
      );
      const beforeUser = await collections.users?.findOne({number: data.number}) as unknown as User;
      let beforeIncidents = incidents.filter(
        incident =>
          haversine(
            {
              lat: beforeUser.location.coordinates[1],
              lon: beforeUser.location.coordinates[0],
            },
            {
              lat: incident.location.coordinates[1],
              lon: incident.location.coordinates[0],
            },
          ) < incident.range,
      );
      let currentDangerlevel = DangerLevel.SAFE;
      let beforeDangerLevel = DangerLevel.SAFE;
      for (let i of beforeIncidents) {
        if (i.level > beforeDangerLevel) beforeDangerLevel = i.level;
      }
      for (let i of currentIncidents) {
        if (i.level > currentDangerlevel) currentDangerlevel = i.level;
      }
      if (currentDangerlevel !== beforeDangerLevel) {
        try {
          await onesignal.createNotification(getNotification(currentDangerlevel, data.number));
          // console.log(response.body);
        } catch (e) {
          // console.log(e);
          if (e instanceof OneSignal.HTTPError) {
            // When status code of HTTP response is not 2xx, HTTPError is thrown.
            console.log(e.statusCode);
            console.log(e.body);
          }
        }
      }
    }

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
