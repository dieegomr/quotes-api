import { UserRepository } from '../gateways';
import { Either } from '../shared';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string): Promise<Either<Error, string>> {
    return await this.userRepository.delete(userId);
  }
}
