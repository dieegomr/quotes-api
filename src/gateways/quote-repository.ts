import { Either } from '../shared';
import { CreateQuoteModel, QuoteModel } from '../gateways';
import { Quote } from '../entities';
import { UpdateQuoteInputDto } from '../usecases/dtos';

export interface QuoteRepository {
  create(createQuoteData: CreateQuoteModel): Promise<Either<Error, QuoteModel>>;
  delete(id: string): Promise<Either<Error, string>>;
  findById(id: string): Promise<Quote | null>;
  update(
    id: string,
    updateQuoteData: UpdateQuoteInputDto
  ): Promise<Either<Error, QuoteModel>>;
}
