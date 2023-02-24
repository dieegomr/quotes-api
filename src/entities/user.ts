import { Either, left, right } from '../shared';
import {
  DifferentUserAccountError,
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from './errors';
import { Name, Password, UserProfile } from '../entities';
import { Email } from './email';

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
    private _email: Email,
    private _createdQuotes: string[],
    private _likedQuotes: string[]
  ) {}

  static create(
    createUserData: CreateUserData
  ): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
    const { id, name, password, email } = createUserData;

    const createdQuotes: string[] = [];
    const likedQuotes: string[] = [];

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

    return right(
      new User(id, nameObj, passwordObj, emailObj, createdQuotes, likedQuotes)
    );
  }

  checkIfIsMyAccount(
    userId: string
  ): Either<DifferentUserAccountError, boolean> {
    if (userId !== this._id) return left(new DifferentUserAccountError());
    return right(true);
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
      createdQuotesQuantity: this._createdQuotes.length,
      likedQuotesQuantity: this._likedQuotes.length,
    };
    return userProfile;
  }
}
