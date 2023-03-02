import { Router } from 'express';
import { LoginController } from '../../controllers';

import { CreateUserController } from '../../controllers/create-user-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { CreateUserUseCase, LoginUseCase } from '../../usecases';

export default (router: Router): void => {
  router.post('/user', async (req, res) => {
    const passwordHashing = new BcryptRepository();
    const repo = new MongoUserRepository();
    const createUser = new CreateUserUseCase(repo, passwordHashing);
    const controller = new CreateUserController(createUser);
    const response = await controller.handle(req);

    res.status(response.statusCode).json(response.data);
  });

  router.post('/login', async (req, res) => {
    const passwordHashing = new BcryptRepository();
    const userRepository = new MongoUserRepository();
    const jwt = new JwtRepository();
    const loginUseCase = new LoginUseCase(userRepository, passwordHashing, jwt);
    const controller = new LoginController(loginUseCase);
    const response = await controller.handle(req);

    res.status(response.statusCode).json(response.data);
  });
};
