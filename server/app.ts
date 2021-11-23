import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import router from './routes';
import sseRouter from './routes/sse';
import { socketInit } from './socket';
import session from 'express-session';

const corsOption = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true
};

const sessionOption: session.SessionOptions = {
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true
};

const sessionMiddleware = session(sessionOption);

const app = express();

const port = process.env.PORT || 5000;

app.use(cors(corsOption));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/img', express.static('upload'));
app.use('/api', router);
app.use('/sse', sseRouter);
const server = app.listen(port, () =>
  console.log(`Server listening at port ${port}`)
);
socketInit(server, app, sessionMiddleware);
