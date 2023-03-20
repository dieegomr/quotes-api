import {
  DifferentAuthorError,
  InvalidQuoteContentError,
} from '../entities/errors';
import { QuoteModel, QuoteRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { UpdateQuoteInputDto } from './dtos';
import { QuoteNotExistError } from './errors';

export class UpdateQuoteUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}
  async execute(
    quoteId: string,
    authorId: string,
    updateQuoteDto: UpdateQuoteInputDto
  ): Promise<
    Either<InvalidQuoteContentError | DifferentAuthorError, QuoteModel>
  > {
    const quote = await this.quoteRepository.findById(quoteId);
    if (!quote) return left(new QuoteNotExistError());

    const quoteOrError = quote.editContent(updateQuoteDto.content, authorId);

    if (quoteOrError.isLeft()) return left(quoteOrError.value);

    const dataToUpdate = { ...updateQuoteDto };

    const updatedQuoteOrError = await this.quoteRepository.update(
      quoteId,
      dataToUpdate
    );

    if (updatedQuoteOrError.isLeft()) return left(updatedQuoteOrError.value);

    return right({
      id: updatedQuoteOrError.value.id,
      content: updatedQuoteOrError.value.content,
      usersWhoLiked: updatedQuoteOrError.value.usersWhoLiked,
      authorId: updatedQuoteOrError.value.authorId,
    });
  }
}
