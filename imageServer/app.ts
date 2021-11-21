import express, { NextFunction, Request, Response } from 'express';
import router from './routes';
import cors from 'cors';
import 'dotenv/config';

const corsOption = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true
};

const app = express();
const port = process.env.PORT || 5001;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/img', router);

app.listen(port, () => console.log(`Server listening at port ${port}`));
