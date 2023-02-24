import { User } from '.';
import { Either, left, right } from '../shared';
import { Content } from './content';
import { InvalidQuoteContentError } from './errors';

export class Quote {
  private constructor(
    private _content: Content,
    usersWhoLiked: string[],
    private _author: User
  ) {}

  get author() {
    return this._author;
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

  editContent(content: string): Either<InvalidQuoteContentError, Quote> {
    const contentOrError: Either<InvalidQuoteContentError, Content> =
      Content.create(content);
    if (contentOrError.isLeft()) return left(contentOrError.value);

    this._content = contentOrError.value;

    return right(this);
  }

  canBeDeleted(currentUserId: string): boolean {
    return currentUserId === this._author.id ? true : false;
  }
}
