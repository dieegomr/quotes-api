import { Either } from '../shared';
import { CreateUserModel, UserModel } from '../gateways';

export interface UserRepository {
  create(user: CreateUserModel): Promise<Either<Error, UserModel>>;
  findByEmail(email: string): Promise<UserModel | null>;
  findById(id: string): Promise<UserModel | null>;
  delete(id: string): Promise<Either<Error, string>>;
}
