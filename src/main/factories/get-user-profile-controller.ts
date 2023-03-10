import { Controller } from '../../controllers/contracts';
import { GetUserProfileController } from '../../controllers/get-user-profile-controller';
import { MongoUserRepository } from '../../external/repositories/mongodb';
import { GetUserProfileUseCase } from '../../usecases/get-user-profile-usecase';

export const makeGetUserProfileController = (): Controller => {
  const userRepository = new MongoUserRepository();
  const getUserProfile = new GetUserProfileUseCase(userRepository);
  return new GetUserProfileController(getUserProfile);
};
