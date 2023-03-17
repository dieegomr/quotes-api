import { Either, left, right } from '../shared';
import { Content, User } from '../entities';
import { DifferentAuthorError, InvalidQuoteContentError } from './errors';

type CreateQuoteData = {
  id: string;
  content: string;
  authorName: string;
};

export class Quote {
  private constructor(
    private _id: string,
    private _content: Content,
    private _usersWhoLiked: string[],
    private _authorName: string
  ) {}

  get id() {
    return this._id;
  }

  get authorName() {
    return this._authorName;
  }

  get content() {
    return this._content;
  }

  get usersWhoLiked() {
    return this._usersWhoLiked;
  }

  static create(
    createQuoteData: CreateQuoteData
  ): Either<InvalidQuoteContentError, Quote> {
    const contentOrError: Either<InvalidQuoteContentError, Content> =
      Content.create(createQuoteData.content);

    if (contentOrError.isLeft()) return left(contentOrError.value);

    const contentObj: Content = contentOrError.value;

    const usersWhoLiked: string[] = [];

    return right(
      new Quote(
        createQuoteData.id,
        contentObj,
        usersWhoLiked,
        createQuoteData.authorName
      )
    );
  }

  editContent(
    content: string,
    user: User
  ): Either<InvalidQuoteContentError | DifferentAuthorError, Quote> {
    if (user.name.value !== this.authorName)
      return left(new DifferentAuthorError());

    const contentOrError: Either<InvalidQuoteContentError, Content> =
      Content.create(content);
    if (contentOrError.isLeft()) return left(contentOrError.value);

    this._content = contentOrError.value;

    return right(this);
  }

  canBeDeleted(currentAccountName: string): boolean {
    return currentAccountName === this.authorName ? true : false;
  }
}
