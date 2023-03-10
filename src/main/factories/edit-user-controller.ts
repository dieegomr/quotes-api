import { Controller } from '../../controllers/contracts';
import { EditUserController } from '../../controllers/edit-user-controller';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { EditUserUseCase } from '../../usecases';

export const makeEditUserController = (): Controller => {
  const userRepository = new MongoUserRepository();
  const editUser = new EditUserUseCase(userRepository);
  return new EditUserController(editUser);
};
