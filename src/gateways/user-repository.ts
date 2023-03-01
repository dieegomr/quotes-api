import { PersistUserError } from '../external/repositories/mongodb/errors/persist-error';
import { Either } from '../shared';
import { CreateUserModel, UserModel } from '../gateways';

export interface UserRepository {
  create(user: CreateUserModel): Promise<Either<PersistUserError, UserModel>>;
  findByEmail(email: string): Promise<UserModel | null>;
}
