import { Controller } from '../../controllers/contracts';
import { UpdatePasswordController } from '../../controllers/update-password-controller';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { UpdatePasswordUseCase } from '../../usecases/update-password-usercase';

export const makeUpdatePasswordController = (): Controller => {
  const userRepository = new MongoUserRepository();
  const passwordHashing = new BcryptRepository();
  const editPassword = new UpdatePasswordUseCase(
    userRepository,
    passwordHashing
  );
  return new UpdatePasswordController(editPassword);
};
