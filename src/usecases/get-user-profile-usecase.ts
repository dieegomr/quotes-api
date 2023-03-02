import { UserRepository } from '../gateways';
import { UserNotLoggedInError } from '../middlewares/errors';
import { Either, left, right } from '../shared';
import { UserProfileOutputDto } from '.';

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    userId: string
  ): Promise<Either<UserNotLoggedInError, UserProfileOutputDto>> {
    const user = await this.userRepository.findById(userId);
    if (!user) return left(new UserNotLoggedInError());

    const userProfileDto: UserProfileOutputDto = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return right(userProfileDto);
  }
}
