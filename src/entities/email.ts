import { Either, left, right } from '../shared';
import { InvalidEmailError } from './errors';

export class Email {
  private readonly email: string;
  private constructor(email: string) {
    this.email = email;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidEmailError(email));
    }
    return right(new Email(email));
  }

  get value(): string {
    return this.email;
  }

  static validate(email: string): boolean {
    const validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return email.match(validRegex) ? true : false;
  }
}
