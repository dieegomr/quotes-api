import { User } from '../entities';
import { PersistUserError } from '../external/repositories/mongodb/errors/persist-error';
import { Either } from '../shared';
import { UserViewModel } from './user-view-model';

export interface UserRepository {
  create(user: User): Promise<Either<PersistUserError, UserViewModel>>;
}
