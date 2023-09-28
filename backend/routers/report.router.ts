import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Report from '../models/report';
import { DangerType } from '../models/types';
import Config from 'react-native-config';

export const reportRouter = express.Router();

reportRouter.use(express.json());

reportRouter.post('/', async (req: Request, res: Response) => {
  const report: Report = req.body;
  try {
    if (collections.reports) {
     const pastReports: Report[] = (await collections.reports
      .find({reporter: report.reporter})
      .toArray()) as unknown as Report[];
    if (pastReports.length >= 1) return res.send({error: true, msg: 'You have already reported a disaster!'});
    //fire and water checks
    if (report.type === DangerType.FIRE) {
      console.log(report.image)
      const json = (await fetch('https://www.de-vis-software.ro/ignisdet.aspx', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: Config.AI_AUTH,
        },
        body: JSON.stringify(body),
      })).json()
      console.log(json)
    }
    await collections.reports.insertOne(report);
    res.send({error: false, msg: 'Mandamos tu reporta!'});
    } else {
    res.send({error: true, msg: 'Un error ha ocurrido!'});
    }
  } catch (error) {
    res.send({error: true, msg: error});
  }
});
