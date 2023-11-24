import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/sensor';
import Sensor from '../models/sensor';
import STATUS_CODES from '../models/status';
import { DangerLevel } from '../models/types';

export const adviceRouter = express.Router();
interface LanguageOption {
    [key: string]: string
}
interface Advice {
    [key: string]: LanguageOption
}
adviceRouter.use(express.json());
// send status of 
adviceRouter.get('/', async (req: Request, res: Response) => {
    const level: DangerLevel = req?.body.level;
    const language: string = req?.body.language;
    const advice: Advice = {
        // safe zone
        "0": {
            "en": "safe",
            "es": "seguro",
            "fr": "",
            "zh": ""
        },
        "1": {
            "en": "risk",
            "es": "risky",
            "fr": "",
            "zh": ""
        },
        "2": {
            "en": "danger",
            "es": "peligro",
            "fr": "",
            "zh": ""
        }
    }
    res.send({advice: advice[String(level)][language], status: STATUS_CODES.SUCCESS});
});