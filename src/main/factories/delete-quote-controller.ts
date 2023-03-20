import { Controller } from '../../controllers/contracts';
import { DeleteQuoteController } from '../../controllers/delete-quote-controller';
import { MongoQuoteRepository } from '../../external/repositories/mongodb';
import { DeleteQuoteUseCase } from '../../usecases';

export const makeDeleteQuoteController = (): Controller => {
  const quoteRepository = new MongoQuoteRepository();
  const deleteQuote = new DeleteQuoteUseCase(quoteRepository);
  return new DeleteQuoteController(deleteQuote);
};
