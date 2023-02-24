import { Either, left, right } from '../shared';
import { InvalidQuoteContentError } from './errors';

export class Content {
  private readonly content: string;
  private constructor(content: string) {
    this.content = content;
  }

  static create(content: string): Either<InvalidQuoteContentError, Content> {
    if (!Content.validate(content)) {
      return left(new InvalidQuoteContentError());
    }
    return right(new Content(content));
  }

  get value(): string {
    return this.content;
  }

  static validate(content: string): boolean {
    if (!content || content.trim().length < 5 || content.trim().length > 300) {
      return false;
    }
    return true;
  }
}
