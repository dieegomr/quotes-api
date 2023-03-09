import { Either } from '../shared';
import { CreateUserModel, UserModel } from '../gateways';
import { User } from '../entities';
import { EditUserInputDto } from '../usecases/dtos';

export interface UserRepository {
  create(user: CreateUserModel): Promise<Either<Error, UserModel>>;
  findByEmail(email: string): Promise<UserModel | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<Either<Error, string>>;
  editUser(
    id: string,
    data: EditUserInputDto
  ): Promise<Either<Error, Omit<UserModel, 'password'>>>;
}
