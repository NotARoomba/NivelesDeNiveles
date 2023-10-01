import express, {Request, Response} from 'express';
import cors, {CorsOptions} from 'cors';
import {collections, connectToDatabase} from './services/database.service';
import {usersRouter} from './routers/users.router';
import {AuthError, HMAC} from 'hmac-auth-express';
import {sensorsRouter} from './routers/sensors.router';
import {verifyRouter} from './routers/verify.router';
import {Server, Socket} from 'socket.io';
import NivelesEvents from './models/events';
import User from './models/user';
import {createServer} from 'http';
import {reportRouter} from './routers/report.router';
import prune from './services/prune.service';
import Incident from './models/incident';
import {DangerLevel} from './models/types';
import Sensor from './models/sensor';
const app = express();
const httpServer = createServer(app);
const port = 3001;

export const corsOptions: CorsOptions = {
  origin: [
    'https://nivelesdeniveles-api.notaroomba.xyz',
    'http://nivelesdeniveles-api.notaroomba.xyz',
    'http://localhost:5173',
    'http://localhost',
  ],
};

const genSecret = async (req: Request) => {
  return req ? Math.floor(Date.now() / (30 * 1000)).toString() : '';
};

const io = new Server(httpServer, {cors: corsOptions});

connectToDatabase(io)
  .then(() => {
    app.use(cors(corsOptions));
    app.use(express.json({limit: '500mb'}));
    app.use(HMAC(genSecret));
    app.use('/users', usersRouter);
    app.use('/sensors', sensorsRouter);
    app.use('/verify', verifyRouter);
    app.use('/report', reportRouter);
    //socket data

    io.on(NivelesEvents.CONNECT, (socket: Socket) => {
      console.log(`New client connected: ${socket.id}`);
      //start the cycle
      socket.emit(NivelesEvents.UPDATE_LOCATION_DATA);
      socket.on(
        NivelesEvents.REQUEST_LOCATION_DATA,
        async (user: User, callback) => {
          // console.log(user.location, user)
          // console.log(user);
          if (!user) return callback({status: DangerLevel.SAFE, sensors: [], incidents: []});
          const incidents: Incident[] = (await collections.incidents
            ?.find({
              location: {
                $near: {
                  $geometry: {...user.location},
                  $maxDistance: 2000,
                },
              },
              over: false,
            })
            .toArray()) as unknown as Incident[];
          let status = DangerLevel.SAFE;
          for (let incident of incidents) {
            if (incident.level > status) status = incident.level;
          }
          const sensors: Sensor[] = (await collections.sensors
            ?.find({
              location: {
                $near: {
                  $geometry: {...user.location},
                  $maxDistance: 2000,
                },
              },
              over: false,
            })
            .toArray()) as unknown as Sensor[];
          callback({status, sensors, incidents});
        },
      );
      socket.on(NivelesEvents.DISCONNECT, () => {
        console.log('Client disconnected');
      });
    });

    app.use('/', async (_req: Request, res: Response) => {
      res.status(200).send('You arent supposed to be here');
    });
    app.use(
      (
        error: {message: string; code: string},
        req: Request,
        res: Response,
        next: () => void,
      ) => {
        // check by error instance
        if (error instanceof AuthError) {
          console.log(error)
          res.status(401).json({
            error: 'Invalid request',
            info: error.message,
          });
        }
        next();
      },
    );
    // app.listen(port, () => {
    //   console.log(`Server started at http://localhost:${port}`);
    // });
    prune();
    setInterval(() => prune(), 1000 * 3600 * 2); // update data every so seconds
    httpServer.listen(port);
    console.log('Server Started!');
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
