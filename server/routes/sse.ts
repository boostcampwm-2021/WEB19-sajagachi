import express, { Request, Response } from 'express';

const router = express.Router();

// https://newbedev.com/how-to-use-server-sent-events-in-express-js
router.get('/', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const interValID = setInterval(() => {
    res.write(`data: ${Date.now().toString()}\n\n`);
  }, 1000);

  res.on('close', () => {
    clearInterval(interValID);
    res.end();
  });
});

export default router;
