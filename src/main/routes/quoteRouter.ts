import express from 'express';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { adptRoute } from '../adpaters';
import { makeCreateQuoteController } from '../factories';

const route = express.Router();

route.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

route.post('/', adptRoute(makeCreateQuoteController()));

export default route;
