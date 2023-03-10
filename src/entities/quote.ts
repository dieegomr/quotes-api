import { Either, left, right } from '../shared';
import { Content, User } from '../entities';
import { DifferentAuthorError, InvalidQuoteContentError } from './errors';

export class Quote {
  private constructor(
    private _content: Content,
    private _usersWhoLiked: string[],
    private _author: User
  ) {}

  get author() {
    return this._author;
  }

  get content() {
    return this._content;
  }

  get usersWhoLiked() {
    return this._usersWhoLiked;
  }

  static create(
    content: string,
    author: User
  ): Either<InvalidQuoteContentError, Quote> {
    const contentOrError: Either<InvalidQuoteContentError, Content> =
      Content.create(content);

    if (contentOrError.isLeft()) return left(contentOrError.value);

    const contentObj: Content = contentOrError.value;

    const usersWhoLiked: string[] = [];

    return right(new Quote(contentObj, usersWhoLiked, author));
  }

  editContent(
    content: string,
    user: User
  ): Either<InvalidQuoteContentError | DifferentAuthorError, Quote> {
    if (user.name !== this.author.name) return left(new DifferentAuthorError());

    const contentOrError: Either<InvalidQuoteContentError, Content> =
      Content.create(content);
    if (contentOrError.isLeft()) return left(contentOrError.value);

    this._content = contentOrError.value;

    return right(this);
  }

  canBeDeleted(currentAccountName: string): boolean {
    return currentAccountName === this._author.name.value ? true : false;
  }
}
