import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import route from '../src/app/routes/index';
import globalMiddleware from './app/middleware/globalMiddleware';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json('db running perfectly');
});

app.use('/api/v1', route);

app.use(globalMiddleware);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'the route not exist',
      },
    ],
  });
  next();
});

export default app;
