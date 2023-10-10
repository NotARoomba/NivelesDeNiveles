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

const isBase64 = (value: string) =>
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
    value,
  );

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

      if (isBase64(report.image)) {
        if (
          report.type === DangerType.FIRE ||
          report.type === DangerType.FLOOD
        ) {
          // console.log(report.image);
          const response = await axios({
            method: 'POST',
            url:
              report.type === DangerType.FIRE
                ? 'https://detect.roboflow.com/fire-smoke-detection-eozii/1'
                : 'https://detect.roboflow.com/flood-detection-3susv/1',
            params: {
              api_key: env.AI_AUTH,
            },
            data: report.image,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          console.log(response.data);
          if (response.data.predictions.length === 0)
            return res.send({
              error: true,
              msg: `Esa imagen no contiene un ${
                report.type === DangerType.FIRE ? 'fuego' : 'inundacion'
              }!`,
            });
          let predictionAvg = 0;
          for (let prediction of response.data.predictions) {
            predictionAvg += prediction.confidence;
          }
          predictionAvg /= response.data.predictions.length;
          console.log(`REPORT PREDICTION AVERAGE: ${predictionAvg}`);
          if (predictionAvg < 0.5) {
            return res.send({
              error: true,
              msg: `Esa imagen no contiene un ${
                report.type === DangerType.FIRE ? 'fuego' : 'inundacion'
              }!`,
            });
          }
        }
      }
      await collections.reports.insertOne(report);
      res.send({error: false, msg: 'Mandamos tu reporta!'});
    } else {
      res.send({
        error: true,
        msg: 'Un error ha ocurrido con el base de datos!',
      });
    }
  } catch (error) {
    console.log(error);
    res.send({error: true, msg: 'Un error ha ocurrido!'});
  }
});
