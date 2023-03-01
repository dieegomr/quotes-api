import { User } from '../entities';
import { CreateUserModel, PasswordHashing, UserRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { CreateUserInputDto, CreateUserOutputDto } from '../usecases';
import { CreateUserErrors, UserExistsError } from './errors';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashing: PasswordHashing
  ) {}
  async execute(
    input: CreateUserInputDto
  ): Promise<Either<CreateUserErrors, CreateUserOutputDto>> {
    const userExist = await this.userRepository.findByEmail(input.email);
    if (userExist) return left(new UserExistsError());

    const userOrError = User.create(input);
    if (userOrError.isLeft()) return left(userOrError.value);

    const hashedPassword = await this.passwordHashing.hash(
      userOrError.value.password.value
    );

    const newUser: CreateUserModel = {
      email: userOrError.value.email.value,
      name: userOrError.value.name.value,
      password: hashedPassword,
    };

    const newUserOrError = await this.userRepository.create(newUser);

    if (newUserOrError.isLeft()) return left(newUserOrError.value);

    const userOutputDto: CreateUserOutputDto = {
      id: newUserOrError.value.id,
      name: newUserOrError.value.name,
      email: newUserOrError.value.email,
    };

    return right(userOutputDto);
  }
}
