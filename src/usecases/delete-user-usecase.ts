import { UserRepository } from '../gateways';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
