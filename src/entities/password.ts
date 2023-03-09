import { Either, left, right } from '../shared';
import { InvalidPasswordError } from './errors';

export class Password {
  private password: string;
  constructor(password: string) {
    this.password = password;
  }

  // static create(password: string): Either<InvalidNameError, Password> {
  //   if (!Password.validate(password)) {
  //     return left(new InvalidPasswordError());
  //   }
  //   return right(new Password(password));
  // }

  get value(): string {
    return this.password;
  }

  set value(password: string) {
    this.value = password;
  }

  static validate(password: string): Either<InvalidPasswordError, string> {
    const validPasswordRegex = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z]).*$/g;
    return password.match(validPasswordRegex)
      ? right(password)
      : left(new InvalidPasswordError());
  }
}
