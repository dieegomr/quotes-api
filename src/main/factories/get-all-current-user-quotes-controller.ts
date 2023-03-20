import { GetAllCurrentUserQuotesController } from '../../controllers';
import { Controller } from '../../controllers/contracts';
import { MongoQuoteRepository } from '../../external/repositories/mongodb';
import { GetAllCurrentUserQuotesUseCase } from '../../usecases/get-all-current-user-quotes-usecase';

export const makeGetAllCurrentUserQuotesController = (): Controller => {
  const repo = new MongoQuoteRepository();
  const getAllCurrentUserQuotes = new GetAllCurrentUserQuotesUseCase(repo);
  return new GetAllCurrentUserQuotesController(getAllCurrentUserQuotes);
};
