import { Either, left, right } from '../shared';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from './errors';
import { Email, Name, Password, UserProfile } from '../entities';

type CreateUserData = {
  id: string;
  name: string;
  password: string;
  email: string;
};

type EditUserData = {
  name: string;
  password: string;
};

export class User {
  private constructor(
    private _id: string,
    private _name: Name,
    private _password: Password,
    private _email: Email
  ) {}

  get password() {
    return this._password;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  static create(
    createUserData: CreateUserData
  ): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
    const { name, password, email, id } = createUserData;

    const nameOrError: Either<InvalidNameError, Name> = Name.create(name);
    if (nameOrError.isLeft()) return left(nameOrError.value);
    const nameObj: Name = nameOrError.value;

    const emailOrError: Either<InvalidEmailError, Email> = Email.create(email);
    if (emailOrError.isLeft()) return left(emailOrError.value);
    const emailObj: Email = emailOrError.value;

    const passwordObj: Password = new Password(password);

    const newUser = new User(id, nameObj, passwordObj, emailObj);

    return right(newUser);
  }

  editUser(
    newName: string,
    newEmail: string
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrerror: Either<InvalidNameError, Name> = Name.create(newName);
    if (nameOrerror.isLeft()) return left(nameOrerror.value);
    this._name = nameOrerror.value;

    const emailOrError: Either<InvalidEmailError, Email> =
      Email.create(newEmail);
    if (emailOrError.isLeft()) return left(emailOrError.value);
    this._email = emailOrError.value;

    return right(this);
  }

  editPassword(newPassword: string): Either<InvalidPasswordError, User> {
    const passwordOrError: Either<InvalidPasswordError, Password> =
      Password.create(newPassword);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);
    this._password = passwordOrError.value;

    return right(this);
  }

  getProfileInfo(): UserProfile {
    return {
      id: this._id,
      name: this._name.value,
      email: this._email.value,
    };
  }

  canIDeleteCurentAccount(currentAccountName: string): boolean {
    return currentAccountName === this.name.value ? true : false;
  }
}
