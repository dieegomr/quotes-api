import { User } from '../entities';
import { UserViewModel } from './user-view-model';

export interface UserRepository {
  create(user: User): Promise<UserViewModel>;
}
