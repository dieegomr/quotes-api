import express from 'express';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { adptRoute } from '../adpaters';
import { makeCreateQuoteController } from '../factories';
import { makeDeleteQuoteController } from '../factories/delete-quote-controller';

const route = express.Router();

route.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

route.post('/', adptRoute(makeCreateQuoteController()));

route.delete('/:id', adptRoute(makeDeleteQuoteController()));

export default route;
