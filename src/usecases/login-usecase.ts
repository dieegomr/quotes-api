import { PasswordHashing, TokenGenerator, UserRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { LoginInputDto } from '.';
import { LoginError, UserNotExistError } from './errors';
import { LoginOutputDto } from './login-dto';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly tokenGenerator: TokenGenerator
  ) {}
  async execute(
    input: LoginInputDto
  ): Promise<Either<LoginError | UserNotExistError, LoginOutputDto>> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (!user) return left(new UserNotExistError());

    const isPasswordCorrect = await this.passwordHashing.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) return left(new LoginError());

    const token = await this.tokenGenerator.sign(user.id);

    return right({ ...user, token });
  }
}
