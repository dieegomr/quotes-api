import { Email, Name, Password, User } from '../entities';
import { CreateUserModel, PasswordHashing, UserRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { CreateUserInputDto, CreateUserOutputDto } from './dtos';
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

    const nameOrError = Name.create(input.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);
    const name: Name = nameOrError.value;

    const emailOrError = Email.create(input.email);
    if (emailOrError.isLeft()) return left(emailOrError.value);
    const email: Email = emailOrError.value;

    const passwordOrError = Password.validate(input.password);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);
    const hashedPassword = await this.passwordHashing.hash(
      passwordOrError.value
    );

    const newUser: CreateUserModel = {
      email: email.value,
      name: name.value,
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
