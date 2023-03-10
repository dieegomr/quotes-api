import { EditPasswordController } from '../../controllers/edit-password-controller';
import { EditUserController } from '../../controllers/edit-user-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { EditUserUseCase } from '../../usecases';
import { EditPasswordUseCase } from '../../usecases/edit-password-usercase';
import {
  makeCreateUserController,
  makeGetUserProfileController,
  makeLoginController,
} from '../factories';
import { adptRoute } from '../adpaters';

import express from 'express';
import { makeDeleteUserController } from '../factories/delelete-user-controller';

const route = express.Router();

route.post('/', adptRoute(makeCreateUserController()));

route.post('/login', adptRoute(makeLoginController()));

route.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

route.get('/profile', adptRoute(makeGetUserProfileController()));

route.delete('/', adptRoute(makeDeleteUserController()));

route.patch('/updateMe', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const editUser = new EditUserUseCase(userRepository);
  const controller = new EditUserController(editUser);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

route.patch('/updateMyPassword', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const passwordHashing = new BcryptRepository();
  const editPassword = new EditPasswordUseCase(userRepository, passwordHashing);
  const controller = new EditPasswordController(editPassword);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

export default route;
