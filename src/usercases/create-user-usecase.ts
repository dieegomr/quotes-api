import { User } from '../entities';
import { PasswordHashing, UserRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { CreateUserInputDto, CreateUserOutputDto } from '../usercases';
import { CreateUserErrors } from './errors';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashing: PasswordHashing
  ) {}
  async execute(
    input: CreateUserInputDto
  ): Promise<Either<CreateUserErrors, CreateUserOutputDto>> {
    const userOrError = User.create(input);
    if (userOrError.isLeft()) return left(userOrError.value);

    const hashedPassword = await this.passwordHashing.hash(
      userOrError.value.password.value
    );

    userOrError.value.password.value = hashedPassword;

    const newUser = await this.userRepository.create(userOrError.value);

    return right(newUser);
  }
}
