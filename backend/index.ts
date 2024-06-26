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
import {STATUS_CODES, createServer} from 'http';
import {reportRouter} from './routers/report.router';
import prune from './services/prune.service';
import Incident from './models/incident';
import {DangerLevel} from './models/types';
import Sensor from './models/sensor';
import haversine from 'haversine-distance';
const app = express();
const httpServer = createServer(app);
const port = 3001;

export const corsOptions: CorsOptions = {
  origin: [
    'https://nivelesdeniveles-api.notaroomba.dev',
    'http://nivelesdeniveles-api.notaroomba.dev',
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
    app.use(HMAC(genSecret, {minInterval: 30}));
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
        async (number: String, callback) => {
          // console.log(user.location, user)
          // console.log(user);
          const user = await collections.users?.findOne({number});
          if (!user)
            return callback({
              status: DangerLevel.SAFE,
              sensors: [],
              incidents: [],
            });
          let incidents = (await collections.incidents
            ?.find({over: false})
            .toArray()) as unknown as Incident[];
          // incidents.filter(
          //   incident =>
          //     { const dist = haversine(
          //       {
          //         lat: user.location.coordinates[1],
          //         lon: user.location.coordinates[0],
          //       },
          //       {
          //         lat: incident.location.coordinates[1],
          //         lon: incident.location.coordinates[0],
          //       },
          //     ); console.log(dist, incident.range); return dist < incident.range}
          // );
          // const incidents: Incident[] = (await collections.incidents
          //   ?.find({
          //     location: {
          //       $geoWithin: {
          //         $centerSphere: {...user.location},
          //         $maxDistance: 2000,
          //       },
          //     },
          //     over: false,
          //   })
          //   .toArray()) as unknown as Incident[];
          let status = DangerLevel.SAFE;
          for (let incident of incidents) {
            if (
              incident.level > status &&
              haversine(
                {
                  lat: user.location.coordinates[1],
                  lon: user.location.coordinates[0],
                },
                {
                  lat: incident.location.coordinates[1],
                  lon: incident.location.coordinates[0],
                },
              ) < incident.range
            )
              status = incident.level;
          }
          const sensors: Sensor[] = (await collections.sensors
            ?.find({})
            .toArray()) as unknown as Sensor[];
          // console.log(sensors)
          callback({status, sensors, incidents}, user);
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
    // setInterval(
    //   () => {
    //     io.emit(NivelesEvents.UPDATE_LOCATION_DATA);
    //     console.log('UPDATING LOCATION DATA');
    //   },
    //   1000 * 60 * 5,
    // );
    httpServer.listen(port);
    console.log('Server Started!');
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
