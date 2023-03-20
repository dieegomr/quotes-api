import { QuoteRepository } from '../gateways';
import { Either, left } from '../shared';
import { QuoteNotExistError } from './errors';
import { QuoteNotBelongsMeError } from './errors/quote-not-belongs-me';

export class DeleteQuoteUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}
  async execute(
    quoteId: string,
    currentUserId: string
  ): Promise<Either<Error, string>> {
    const quote = await this.quoteRepository.findById(quoteId);
    if (!quote) return left(new QuoteNotExistError());

    if (!quote.canBeDeleted(currentUserId))
      return left(new QuoteNotBelongsMeError());

    return await this.quoteRepository.delete(quoteId);
  }
}
