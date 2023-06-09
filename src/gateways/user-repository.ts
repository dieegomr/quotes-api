import { Either } from '../shared';
import { CreateUserModel, UserModel } from '../gateways';
import { User } from '../entities';
import { UpdateUserInputDto } from '../usecases/dtos';

export interface UserRepository {
  save(user: CreateUserModel): Promise<Either<Error, UserModel>>;
  findByEmail(email: string): Promise<UserModel | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<Either<Error, string>>;
  update(
    id: string,
    data: UpdateUserInputDto
  ): Promise<Either<Error, Omit<UserModel, 'password'>>>;
}
