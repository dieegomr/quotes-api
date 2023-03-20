import { QuoteModel, QuoteRepository } from '../gateways';

export class GetAllCurrentUserQuotesUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}
  async execute(authorId: string): Promise<QuoteModel[]> {
    const currentUserQuotes = await this.quoteRepository.findAllByAuthorId(
      authorId
    );

    return currentUserQuotes;
  }
}
