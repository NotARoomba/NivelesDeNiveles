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

const isBase64 = (value: string) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

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
      if (report.type === DangerType.FIRE) {
        console.log(report.image);
        if (isBase64(report.image)) {
          const response = await axios({
            method: "POST",
            url: "https://detect.roboflow.com/firedetector/1",
            params: {
                api_key: env.AI_AUTH
            },
            data: report.image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        console.log(response.data);
        } 
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
