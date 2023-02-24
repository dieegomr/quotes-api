import { Either, left, right } from '../shared';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
  InvalidQuoteContentError,
} from './errors';
import { Name, Password, Quote, UserProfile } from '../entities';
import { Email } from '../entities';

type CreateUserData = {
  id: string;
  name: string;
  password: string;
  email: string;
};

export class User {
  private constructor(
    private readonly _id: string,
    private _name: Name,
    private _password: Password,
    private _email: Email
  ) {}

  static create(
    createUserData: CreateUserData
  ): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
    const { id, name, password, email } = createUserData;

    const nameOrError: Either<InvalidNameError, Name> = Name.create(name);
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(email);
    const passwordOrError: Either<InvalidPasswordError, Password> =
      Password.create(password);

    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (emailOrError.isLeft()) return left(emailOrError.value);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    const nameObj: Name = nameOrError.value;
    const emailObj: Email = emailOrError.value;
    const passwordObj: Password = passwordOrError.value;

    return right(new User(id, nameObj, passwordObj, emailObj));
  }

  editName(newName: string): Either<InvalidNameError, User> {
    const nameOrerror: Either<InvalidNameError, Name> = Name.create(newName);

    if (nameOrerror.isLeft()) return left(nameOrerror.value);

    this._name = nameOrerror.value;

    return right(this);
  }

  editPassword(newPassword: string): Either<InvalidPasswordError, User> {
    const passwordOrError: Either<InvalidPasswordError, Password> =
      Password.create(newPassword);

    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    this._password = passwordOrError.value;

    return right(this);
  }

  editEmail(newEmail: string): Either<InvalidEmailError, User> {
    const emailOrError: Either<InvalidEmailError, Email> =
      Email.create(newEmail);

    if (emailOrError.isLeft()) return left(emailOrError.value);

    this._email = emailOrError.value;

    return right(this);
  }

  getMyProfileInfo(): UserProfile {
    const userProfile = {
      name: this._name.value,
      email: this._email.value,
    };
    return userProfile;
  }

  createQuote(content: string): Either<InvalidQuoteContentError, Quote> {
    const quoteOrError: Either<InvalidQuoteContentError, Quote> = Quote.create(
      content,
      this
    );

    if (quoteOrError.isLeft()) return left(quoteOrError.value);

    return right(quoteOrError.value);
  }
}
