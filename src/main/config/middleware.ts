import { Express } from 'express';
import { bodyParser } from '../middleware/body-parser';
import { contentType } from '../middleware/content-type';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(contentType);
};
