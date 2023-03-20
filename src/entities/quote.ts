import { Either, left, right } from '../shared';
import { Content, User } from '../entities';
import { DifferentAuthorError, InvalidQuoteContentError } from './errors';

type CreateQuoteData = {
  quoteId: string;
  content: string;
  authorId: string;
};

export class Quote {
  private constructor(
    private _id: string,
    private _content: Content,
    private _usersWhoLiked: string[],
    private _authorId: string
  ) {}

  get id() {
    return this._id;
  }

  get authorId() {
    return this._authorId;
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
        createQuoteData.quoteId,
        contentObj,
        usersWhoLiked,
        createQuoteData.authorId
      )
    );
  }

  editContent(
    content: string,
    user: User
  ): Either<InvalidQuoteContentError | DifferentAuthorError, Quote> {
    if (user.id !== this.authorId) return left(new DifferentAuthorError());

    const contentOrError: Either<InvalidQuoteContentError, Content> =
      Content.create(content);
    if (contentOrError.isLeft()) return left(contentOrError.value);

    this._content = contentOrError.value;

    return right(this);
  }

  canBeDeleted(currentUserId: string): boolean {
    return currentUserId === this.authorId ? true : false;
  }
}
