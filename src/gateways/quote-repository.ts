import { Quote } from '../entities';
import { Either } from '../shared';

export interface QuoteRepository {
  create(quote: Quote): Promise<Either<Error, Quote>>;
}
