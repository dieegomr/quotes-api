import { Controller } from '../../controllers/contracts';
import { DeleteUserController } from '../../controllers/delete-user-controller';
import { MongoUserRepository } from '../../external/repositories/mongodb/mongo-user-repository';
import { DeleteUserUseCase } from '../../usecases';

export const makeDeleteUserController = (): Controller => {
  const userRepository = new MongoUserRepository();
  const deleteUser = new DeleteUserUseCase(userRepository);
  return new DeleteUserController(deleteUser);
};
