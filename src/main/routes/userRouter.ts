import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeUpdatePasswordController,
  makeUpdateUserController,
  makeGetUserProfileController,
  makeLoginController,
} from '../factories';
import { adptRoute } from '../adpaters';

import express from 'express';

const route = express.Router();

route.post('/', adptRoute(makeCreateUserController()));

route.post('/login', adptRoute(makeLoginController()));

route.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

route.get('/profile', adptRoute(makeGetUserProfileController()));

route.delete('/', adptRoute(makeDeleteUserController()));

route.patch('/updateMe', adptRoute(makeUpdateUserController()));

route.patch('/updateMyPassword', adptRoute(makeUpdatePasswordController()));

export default route;
