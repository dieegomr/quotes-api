import express from 'express';
import { LoginController } from '../../controllers';

import { CreateUserController } from '../../controllers/create-user-controller';
import { GetUserProfileController } from '../../controllers/get-user-profile-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { CreateUserUseCase, LoginUseCase } from '../../usecases';
import { GetUserProfileUseCase } from '../../usecases/get-user-profile-usecase';

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const passwordHashing = new BcryptRepository();
  const repo = new MongoUserRepository();
  const createUser = new CreateUserUseCase(repo, passwordHashing);
  const controller = new CreateUserController(createUser);
  const response = await controller.handle(req);

  res.status(response.statusCode).json(response.data);
});

userRouter.post('/login', async (req, res) => {
  const passwordHashing = new BcryptRepository();
  const userRepository = new MongoUserRepository();
  const jwt = new JwtRepository();
  const loginUseCase = new LoginUseCase(userRepository, passwordHashing, jwt);
  const controller = new LoginController(loginUseCase);
  const response = await controller.handle(req);

  res.status(response.statusCode).json(response.data);
});

userRouter.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

userRouter.get('/profile', async (req, res) => {
  const userRepository = new MongoUserRepository();
  const getUserProfile = new GetUserProfileUseCase(userRepository);
  const controller = new GetUserProfileController(getUserProfile);
  const response = await controller.handle(req);
  res.status(response.statusCode).json(response.data);
});

export default userRouter;
