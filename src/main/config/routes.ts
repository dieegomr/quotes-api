import { Express } from 'express';
import quoteRouter from '../routes/quoteRouter';
import userRouter from '../routes/userRouter';

export const setupRoutes = (app: Express): void => {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/quote', quoteRouter);
  app.all('*', async (req, res) => {
    res.status(404).json(`Can't find ${req.originalUrl} on this server`);
  });
};
