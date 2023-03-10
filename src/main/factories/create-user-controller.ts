import { CreateUserController } from '../../controllers';
import { Controller } from '../../controllers/contracts';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { CreateUserUseCase } from '../../usecases';

export const makeCreateUserController = (): Controller => {
  const passwordHashing = new BcryptRepository();
  const repo = new MongoUserRepository();
  const createUser = new CreateUserUseCase(repo, passwordHashing);
  return new CreateUserController(createUser);
};
