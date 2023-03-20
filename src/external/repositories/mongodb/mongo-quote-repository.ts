import { ObjectId } from 'mongodb';
import {
  CreateQuoteModel,
  QuoteModel,
  QuoteRepository,
} from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { MongoClient } from '../../database/mongo';
import { DeleteQuoteError, PersistDataError } from './errors';

export class MongoQuoteRepository implements QuoteRepository {
  async create(
    createQuoteData: CreateQuoteModel
  ): Promise<Either<Error, QuoteModel>> {
    const { insertedId } = await MongoClient.db
      .collection('quotes')
      .insertOne(createQuoteData);

    const createdQuote = await MongoClient.db
      .collection<QuoteModel>('quotes')
      .findOne({ _id: insertedId });

    if (!createdQuote) {
      return left(new PersistDataError());
    }

    const { _id, authorName, content, usersWhoLiked } = createdQuote;

    return right({ id: _id.toHexString(), authorName, content, usersWhoLiked });
  }
  async delete(quoteId: string): Promise<Either<Error, string>> {
    const { deletedCount } = await MongoClient.db
      .collection('quotes')
      .deleteOne({ _id: new ObjectId(quoteId) });

    if (!deletedCount) return left(new DeleteQuoteError());

    return right('Successfully deleted quote');
  }
}
