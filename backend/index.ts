import express, {Request, Response} from 'express';
import cors, {CorsOptions} from 'cors';
import {connectToDatabase} from './services/database.service';
import {usersRouter} from './routers/users.router';
import {AuthError, HMAC} from 'hmac-auth-express';
import {sensorsRouter} from './routers/sensors.router';
import {verifyRouter} from './routers/verify.router';
import { Server, Socket } from "socket.io";
import NivelesEvents from './models/events';
import User from './models/user';
import { createServer } from 'http';
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

const io = new Server(httpServer, { cors: corsOptions});

connectToDatabase()
  .then(() => {
    // app.use(cors(corsOptions));
    // app.use(express.json());
    // app.use(HMAC(genSecret));
    // app.use('/users', usersRouter);
    // app.use('/sensors', sensorsRouter);
    // app.use('/verify', verifyRouter);
    //socket data

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token !== Math.floor(Date.now() / (30 * 1000)).toString()) new Error('Not Authorized')
    next();
  });
    
  io.on(NivelesEvents.CONNECT, (socket: Socket) => {
    console.log(socket.id)
    console.log('Connected client on port %s.', port);
  
    socket.on(NivelesEvents.GET_USER, (socket: Socket, number: string) => {
      console.log('user_update: %s', number);
    });
  
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
    httpServer.listen(port);
    console.log('Server Started!');
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });