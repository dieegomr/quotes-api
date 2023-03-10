import { PasswordHashing, UserRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { UserNotExistError } from './errors';

type EditPasswordInputDto = {
  userId: string;
  newPassword: string;
};

export class EditPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHashing
  ) {}
  async execute(
    editPasswordInputDto: EditPasswordInputDto
  ): Promise<Either<Error, string>> {
    const user = await this.userRepository.findById(
      editPasswordInputDto.userId
    );
    if (!user) return left(new UserNotExistError());

    const userOrError = user.editPassword(editPasswordInputDto.newPassword);
    if (userOrError.isLeft()) return left(userOrError.value);

    const hashedPassword = await this.passwordHasher.hash(
      userOrError.value.password.value
    );

    const updatedOrError = await this.userRepository.editUser(
      editPasswordInputDto.userId,
      {
        password: hashedPassword,
      }
    );
    if (updatedOrError.isLeft()) return left(updatedOrError.value);

    return right('Successfully edited password');
  }
}
