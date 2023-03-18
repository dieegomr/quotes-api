import { Either } from '../shared';
import { CreateQuoteModel, QuoteModel } from '../gateways';

export interface QuoteRepository {
  create(createQuoteData: CreateQuoteModel): Promise<Either<Error, QuoteModel>>;
}
