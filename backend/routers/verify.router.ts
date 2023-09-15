import express, {Request, Response} from 'express';
import {Twilio} from 'twilio';
import {load} from 'ts-dotenv';

const env = load({
  TW_SID: String,
  TW_VSID: String,
  TW_TOKEN: String,
});

const twilio: Twilio = new Twilio(env.TW_SID, env.TW_TOKEN);

export const verifyRouter = express.Router();

verifyRouter.use(express.json());

verifyRouter.post('/send', async (req: Request, res: Response) => {
  const number: string =
    req?.body?.number[0] === '+'
      ? req?.body?.number
      : (('+57' + req?.body?.number) as string);
  if (req?.body?.number === '') {
    return res.send({error: true, msg: 'Please add a number!'});
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
      res.send({error: false, msg: 'The code has been sent!'});
    } else if (!verification.lookup.valid) {
      res.send({error: true, msg: 'The phone number does not exist!'});
    } else {
      res.send({error: true, msg: 'There was an error sending the code!'});
    }
  } catch (error: any) {
    console.log(error);
    if (error.status === 429) {
      return res.send({
        error: true,
        msg: 'Too many attempts, try again in 10 minutes!',
      });
    }
    res.send({error: true, msg: 'Unable to send the Twilio code!'});
  }
});

verifyRouter.post('/check', async (req: Request, res: Response) => {
  const number: string =
    req?.body?.number[0] === '+'
      ? req?.body?.number
      : (('+57' + req?.body?.number) as string);
  const code: string = req?.body?.code as string;
  console.log(number, code);
  let verification;
  try {
    verification = await twilio.verify.v2
      .services(env.TW_VSID)
      .verificationChecks.create({
        code,
        to: number,
      });
    console.log(verification);
    if (verification.status === 'approved') {
      res.send({error: false, msg: 'The code has been approved!'});
    } else {
      res.send({error: true, msg: 'Incorrect code!'});
    }
  } catch (error: any) {
    if (error.status === 400 && error.code === 60200) {
      return res.send({error: true, msg: 'The code is too short!'});
    } else if (error.status === 404 && error.code === 20404) {
      return res.send({
        error: true,
        msg: 'The code has expired, please try again!',
      });
    }
    res.send({error: true, msg: 'Unable to check the code!'});
  }
});
