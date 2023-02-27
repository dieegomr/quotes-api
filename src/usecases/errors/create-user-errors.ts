import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from '../../entities/errors';

export type CreateUserErrors =
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError;
