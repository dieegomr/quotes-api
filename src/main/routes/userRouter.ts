import express from 'express';
import { LoginController } from '../../controllers';

import { CreateUserController } from '../../controllers/create-user-controller';
import { DeleteUserController } from '../../controllers/delete-user-controller';
import { EditUserController } from '../../controllers/edit-user-controller';
import { GetUserProfileController } from '../../controllers/get-user-profile-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
  CreateUserUseCase,
  EditUserUseCase,
  LoginUseCase,
} from '../../usecases';
import { DeleteUserUseCase } from '../../usecases/delete-user-usecase';
import { GetUserProfileUseCase } from '../../usecases/get-user-profile-usecase';

const route = express.Router();

route.post('/', async (req, res) => {
  const passwordHashing = new BcryptRepository();
  const repo = new MongoUserRepository();
  const createUser = new CreateUserUseCase(repo, passwordHashing);
  const controller = new CreateUserController(createUser);
  const response = await controller.handle(req);

  res.status(response.statusCode).json(response.data);
});

route.post('/login', async (req, res) => {
  const passwordHashing = new BcryptRepository();
  const userRepository = new MongoUserRepository();
  const jwt = new JwtRepository();
  const loginUseCase = new LoginUseCase(userRepository, passwordHashing, jwt);
  const controller = new LoginController(loginUseCase);
  const response = await controller.handle(req);

  res.status(response.statusCode).json(response.data);
});

route.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

route.get('/profile', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const getUserProfile = new GetUserProfileUseCase(userRepository);
  const controller = new GetUserProfileController(getUserProfile);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

route.delete('/', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const deleteUser = new DeleteUserUseCase(userRepository);
  const controller = new DeleteUserController(deleteUser);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

route.patch('/updateMe', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const editUser = new EditUserUseCase(userRepository);
  const controller = new EditUserController(editUser);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

export default route;
