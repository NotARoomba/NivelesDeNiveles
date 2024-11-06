import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Report from '../models/report';
import {DangerType} from '../models/types';
import axios from 'axios';
import * as dotenv from 'ts-dotenv';
import STATUS_CODES from '../models/status';
import haversine from 'haversine-distance';

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
        .find({reporter: report.reporter, over: false})
        .toArray()) as unknown as Report[];
      if (pastReports.length >= 1) {
        let minDistance = Infinity;
        for (let pastReport of pastReports) {
          minDistance = Math.min(
            minDistance,
            haversine(
              {
                lat: report.location.coordinates[1],
                lon: report.location.coordinates[0],
              },
              {
                lat: pastReport.location.coordinates[1],
                lon: pastReport.location.coordinates[0],
              },
            ),
          );
        }
        if (minDistance > 500)
          return res.send({
            status: STATUS_CODES.ALREADY_REPORTED,
          });
      }
      //fire and water checks

      if (isBase64(report.image)) {
        // if (
        //   report.type === DangerType.FIRE ||
        //   report.type === DangerType.FLOOD
        // ) {
        // console.log(report.image);
        const response = await axios({
          method: 'POST',
          url:
            report.type === DangerType.FIRE
              ? 'https://detect.roboflow.com/fire-smoke-detection-eozii/1'
              : report.type === DangerType.FLOOD
              ? 'https://detect.roboflow.com/flood-detection-3susv/1'
              : 'https://detect.roboflow.com/landslides-pyn83/1',
          params: {
            api_key: env.AI_AUTH,
          },
          data: report.image,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        // console.log(response.data);
        if (response.data.predictions.length === 0)
          return res.send({
            status: STATUS_CODES.MISMATCHED_IMAGE,
          });
        let predictionAvg = 0;
        for (let prediction of response.data.predictions) {
          predictionAvg += prediction.confidence;
        }
        predictionAvg /= response.data.predictions.length;
        console.log(
          `REPORT PREDICTION AVERAGE: ${predictionAvg}% FOR DISASTER TYPE ${report.type}`,
        );
        if (predictionAvg < 0.7) {
          return res.send({
            status: STATUS_CODES.MISMATCHED_IMAGE,
          });
        }
        // }
      }
      await collections.reports.insertOne(report);
      res.send({status: STATUS_CODES.SUCCESS});
    } else {
      res.send({
        status: STATUS_CODES.GENERIC_ERROR,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({status: STATUS_CODES.GENERIC_ERROR});
  }
});
