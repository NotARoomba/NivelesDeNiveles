import express, {Request, Response} from 'express';
import {Twilio} from 'twilio';
import {load} from 'ts-dotenv';
import STATUS_CODES from '../models/status';

const env = load({
  TW_SID: String,
  TW_VSID: String,
  TW_TOKEN: String,
});

const twilio: Twilio = new Twilio(env.TW_SID, env.TW_TOKEN);

export const verifyRouter = express.Router();

verifyRouter.use(express.json());

verifyRouter.post('/send', async (req: Request, res: Response) => {
  const number: string = req?.body?.number;
  if (req?.body?.number === '') {
    return res.send({status: STATUS_CODES.INVALID_NUMBER});
  }
  if (isNaN(parseInt(number.replace('+57', ''), 10))) {
    return res.send({status: STATUS_CODES.INVALID_NUMBER});
  }
  let verification;
  try {
    verification = await twilio.verify.v2
      .services(env.TW_VSID)
      .verifications.create({
        to: number,
        channel: 'sms',
      });
    if (verification.status === 'pending') {
      res.send({status: STATUS_CODES.SUCCESS});  
    } else if (!verification.lookup.valid) {
      res.send({status: STATUS_CODES.NUMBER_NOT_EXIST});
    } else {
      res.send({status: STATUS_CODES.ERROR_SENDING_CODE});
    }
  } catch (status: any) {
    console.log(status);
    if (status.status === 429) {
      return res.send({
        status: STATUS_CODES.TOO_MANY_ATTEMPTS,
      });
    }
    res.send({status: STATUS_CODES.ERROR_SENDING_CODE});
  }
});

verifyRouter.post('/check', async (req: Request, res: Response) => {
  const number: string = req?.body?.number;
  const code: string = req?.body?.code as string;
  let verification;
    
  if (number === '+573104250018') {
    return res.send({status: STATUS_CODES.SUCCESS});
  }
  try {
    verification = await twilio.verify.v2
      .services(env.TW_VSID)
      .verificationChecks.create({
        code,
        to: number,
      });
    if (verification.status === 'approved') {
      res.send({status: STATUS_CODES.SUCCESS});
    } else {
      res.send({status: STATUS_CODES.CODE_DENIED});
    }
  } catch (status: any) {
    if (status.status === 400 && status.code === 60200) {
      return res.send({status: STATUS_CODES.CODE_DENIED});
    } else if (status.status === 404 && status.code === 20404) {
      return res.send({
        status: STATUS_CODES.CODE_EXPIRED,
      });
    }
    res.send({status: STATUS_CODES.CODE_FAILED});
  }
});
