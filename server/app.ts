import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './routes';

const corsOption = {
	origin: process.env.CLIENT_URL,
	optionsSuccessStatus: 200,
	credentials: true
};

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', router);

app.listen(port, () => console.log(`Server listening at port ${port}`));
