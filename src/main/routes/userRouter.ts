import express from 'express';
import { LoginController } from '../../controllers';

import { CreateUserController } from '../../controllers/create-user-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { CreateUserUseCase, LoginUseCase } from '../../usecases';

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
  console.log('aqui');
  const passwordHashing = new BcryptRepository();
  const userRepository = new MongoUserRepository();
  const jwt = new JwtRepository();
  const loginUseCase = new LoginUseCase(userRepository, passwordHashing, jwt);
  const controller = new LoginController(loginUseCase);
  const response = await controller.handle(req);

  res.status(response.statusCode).json(response.data);
});

userRouter.use(authMiddleware(new MongoUserRepository(), new JwtRepository()));

userRouter.get('/test', async (req, res) => {
  res.status(200).json('test my brother');
});

export default userRouter;
