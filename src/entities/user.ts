import { Either, left, right } from '../shared';
import { Email } from './email';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from './errors';
import { Name } from './name';
import { Password } from './password';

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
}
