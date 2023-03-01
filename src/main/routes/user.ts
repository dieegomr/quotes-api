import { Router } from 'express';

import { CreateUserController } from '../../controllers/create-user-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { CreateUserUseCase } from '../../usecases';

export default (router: Router): void => {
  router.post('/user', async (req, res) => {
    // add try catch
    const passwordHashing = new BcryptRepository();
    const repo = new MongoUserRepository();
    const createUser = new CreateUserUseCase(repo, passwordHashing);
    const controller = new CreateUserController(createUser);

    const response = await controller.handle(req);

    res.status(response.statusCode).json(response.data);
  });
};
