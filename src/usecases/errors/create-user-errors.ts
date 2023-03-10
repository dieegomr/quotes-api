import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from '../../entities/errors';
import { PersistDataError } from '../../external/repositories/mongodb/errors/persist-error';
import { UserExistsError } from './user-exists-error';

export type CreateUserErrors =
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError
  | PersistDataError
  | UserExistsError;
