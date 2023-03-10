import { Controller } from '../../controllers/contracts';
import { EditPasswordController } from '../../controllers/edit-password-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { EditPasswordUseCase } from '../../usecases/edit-password-usercase';

export const makeEditPasswordController = (): Controller => {
  const userRepository = new MongoUserRepository();
  const passwordHashing = new BcryptRepository();
  const editPassword = new EditPasswordUseCase(userRepository, passwordHashing);
  return new EditPasswordController(editPassword);
};
