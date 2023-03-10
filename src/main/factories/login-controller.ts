import { LoginController } from '../../controllers';
import { Controller } from '../../controllers/contracts';
import { BcryptRepository } from '../../external/repositories/bcrypt/bcrypt-repository';
import { JwtRepository } from '../../external/repositories/jwt/jwt-repository';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { LoginUseCase } from '../../usecases';

export const makeLoginController = (): Controller => {
  const passwordHashing = new BcryptRepository();
  const userRepository = new MongoUserRepository();
  const jwt = new JwtRepository();
  const loginUseCase = new LoginUseCase(userRepository, passwordHashing, jwt);
  return new LoginController(loginUseCase);
};
