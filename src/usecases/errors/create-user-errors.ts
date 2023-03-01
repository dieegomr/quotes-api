import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from '../../entities/errors';
import { PersistUserError } from '../../external/repositories/mongodb/errors/persist-error';
import { UserExistsError } from './user-exists-error';

export type CreateUserErrors =
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError
  | PersistUserError
  | UserExistsError;
