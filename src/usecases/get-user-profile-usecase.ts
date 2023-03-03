import { UserModel, UserRepository } from '../gateways';
import { UserProfileOutputDto } from '../usecases';

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string): Promise<UserProfileOutputDto | null> {
    const user = (await this.userRepository.findById(userId)) as UserModel;

    const userProfileDto: UserProfileOutputDto = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return userProfileDto;
  }
}
