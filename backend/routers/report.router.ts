import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Report from '../models/report';
import {DangerType} from '../models/types';
import axios from 'axios';
import * as dotenv from 'ts-dotenv';

export const reportRouter = express.Router();

const env = dotenv.load({
  AI_AUTH: String,
});

reportRouter.use(express.json());

reportRouter.post('/', async (req: Request, res: Response) => {
  const report: Report = req.body;
  try {
    if (collections.reports) {
      const pastReports: Report[] = (await collections.reports
        .find({reporter: report.reporter})
        .toArray()) as unknown as Report[];
      if (pastReports.length >= 1)
        return res.send({
          error: true,
          msg: 'You have already reported a disaster!',
        });
      //fire and water checks
      console.log(`Basic ${Buffer.from(env.AI_AUTH).toString(
        'base64',
      )}`)
      if (report.type === DangerType.FIRE) {
        console.log(report.image);
        console.log(`Basic ${Buffer.from(env.AI_AUTH).toString(
          'base64',
        )}`)
        const response = await axios.post<{
          predictions: {probability: number}[];
        }>('https://www.de-vis-software.ro/ignisdet.aspx', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(env.AI_AUTH).toString(
              'base64',
            )}`,
          },
          body: JSON.stringify({
            base64_Photo_String: report.image,
            photo_url: 'NO',
          }),
        });
        console.log(response);
        if (response.data.predictions[0].probability < 0.75)
          return res.send({
            error: true,
            msg: 'Fuego no fue detectado en ese imagen!',
          });
      }
      await collections.reports.insertOne(report);
      res.send({error: false, msg: 'Mandamos tu reporta!'});
    } else {
      res.send({error: true, msg: 'Un error ha ocurrido!'});
    }
  } catch (error) {
    res.send({error: true, msg: 'Un error ha ocurrido!'});
  }
});
