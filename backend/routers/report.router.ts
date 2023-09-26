import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Report from '../models/report';

export const reportRouter = express.Router();

reportRouter.use(express.json());

reportRouter.post('/', async (req: Request, res: Response) => {
  const report: Report = req.body;
  try {
    if (collections.reports) {
     const pastReports: Report[] = (await collections.reports
      .find({reporter: report.reporter})
      .toArray()) as unknown as Report[];
    if (pastReports.length >= 1) return res.send({error: true, msg: 'You have already reported too many times!'});
    await collections.reports.insertOne(report);
    res.send({error: false, msg: 'Mandamos tu reporta!'});
    } else {
    res.send({error: true, msg: 'Un error ha ocurrido!'});
    }
  } catch (error) {
    res.send({error: true, msg: error});
  }
});
