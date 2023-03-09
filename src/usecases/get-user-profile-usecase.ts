import { User } from '../entities';
import { UserRepository } from '../gateways';
import { UserProfileOutputDto } from '../usecases';

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string): Promise<UserProfileOutputDto | null> {
    const user = (await this.userRepository.findById(userId)) as User;

    const userProfileDto: UserProfileOutputDto = user.getProfileInfo();

    return userProfileDto;
  }
}
