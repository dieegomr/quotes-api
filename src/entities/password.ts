import { Either, left, right } from '../shared';
import { InvalidNameError, InvalidPasswordError } from './errors';

export class Password {
  private readonly password: string;
  private constructor(password: string) {
    this.password = password;
  }

  static create(password: string): Either<InvalidNameError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError());
    }
    return right(new Password(password));
  }

  get value(): string {
    return this.password;
  }

  static validate(password: string): boolean {
    const validPasswordRegex = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z]).*$/g;
    return password.match(validPasswordRegex) ? true : false;
  }
}
