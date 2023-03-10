import { EditPasswordController } from '../../controllers/edit-password-controller';
import { EditUserController } from '../../controllers/edit-user-controller';
import { GetUserProfileController } from '../../controllers/get-user-profile-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { EditUserUseCase } from '../../usecases';
import { EditPasswordUseCase } from '../../usecases/edit-password-usercase';
import { GetUserProfileUseCase } from '../../usecases/get-user-profile-usecase';
import { makeCreateUserController, makeLoginController } from '../factories';
import { adptRoute } from '../adpaters';

import express from 'express';
import { makeDeleteUserController } from '../factories/delelete-user-controller';

const route = express.Router();

route.post('/', adptRoute(makeCreateUserController()));

route.post('/login', adptRoute(makeLoginController()));

route.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

route.get('/profile', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const getUserProfile = new GetUserProfileUseCase(userRepository);
  const controller = new GetUserProfileController(getUserProfile);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

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
