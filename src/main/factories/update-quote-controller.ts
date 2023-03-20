import { Controller } from '../../controllers/contracts';
import { UpdateQuoteController } from '../../controllers';
import { UpdateQuoteUseCase } from '../../usecases';
import { MongoQuoteRepository } from '../../external/repositories/mongodb';

export const makeUpdateQuoteController = (): Controller => {
  const repo = new MongoQuoteRepository();
  const updateQuote = new UpdateQuoteUseCase(repo);
  return new UpdateQuoteController(updateQuote);
};
