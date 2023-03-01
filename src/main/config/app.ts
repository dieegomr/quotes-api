import { setupRoutes } from '../config/routes';
import setupMiddleware from './middleware';

import express from 'express';

const app = express();
setupMiddleware(app);
setupRoutes(app);
export default app;
