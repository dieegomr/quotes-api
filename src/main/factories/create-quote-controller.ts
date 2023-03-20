import { Controller } from '../../controllers/contracts';
import { CreateQuoteController } from '../../controllers/create-quote-controller';
import { MongoQuoteRepository } from '../../external/repositories/mongodb/mongo-quote-repository';
import { CreateQuoteUseCase } from '../../usecases';

export const makeCreateQuoteController = (): Controller => {
  const repo = new MongoQuoteRepository();
  const createQuote = new CreateQuoteUseCase(repo);
  return new CreateQuoteController(createQuote);
};
