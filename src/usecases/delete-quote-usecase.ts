import { QuoteRepository } from '../gateways';
import { Either } from '../shared';

export class DeleteQuoteUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}
  async execute(quoteId: string): Promise<Either<Error, string>> {
    return await this.quoteRepository.delete(quoteId);
  }
}
