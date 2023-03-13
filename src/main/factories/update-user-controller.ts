import { Controller } from '../../controllers/contracts';
import { UpdateUserController } from '../../controllers/update-user-controller';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { UpdateUserUseCase } from '../../usecases';

export const makeUpdateUserController = (): Controller => {
  const userRepository = new MongoUserRepository();
  const editUser = new UpdateUserUseCase(userRepository);
  return new UpdateUserController(editUser);
};
