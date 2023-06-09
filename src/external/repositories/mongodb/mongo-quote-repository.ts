import { ObjectId } from 'mongodb';
import { Quote } from '../../../entities';
import {
  CreateQuoteModel,
  QuoteModel,
  QuoteRepository,
} from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { UpdateQuoteInputDto } from '../../../usecases/dtos';
import { MongoClient } from '../../database/mongo';
import { DeleteQuoteError, PersistDataError, UpdateQuoteError } from './errors';

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

    const { _id, authorId, content, usersWhoLiked } = createdQuote;

    return right({ id: _id.toHexString(), authorId, content, usersWhoLiked });
  }
  async delete(quoteId: string): Promise<Either<Error, string>> {
    const { deletedCount } = await MongoClient.db
      .collection('quotes')
      .deleteOne({ _id: new ObjectId(quoteId) });

    if (!deletedCount) return left(new DeleteQuoteError());

    return right('Successfully deleted quote');
  }

  async findById(id: string): Promise<Quote | null> {
    const quoteExists = await MongoClient.db
      .collection<QuoteModel>('quotes')
      .findOne({ _id: new ObjectId(id) });

    if (!quoteExists) return null;

    const quoteOrError = Quote.create({
      quoteId: quoteExists._id.toHexString(),
      authorId: quoteExists.authorId,
      content: quoteExists.content,
    });
    if (quoteOrError.isLeft()) return null;

    return quoteOrError.value;
  }

  async update(
    id: string,
    data: UpdateQuoteInputDto
  ): Promise<Either<Error, QuoteModel>> {
    const updatedQuote = await MongoClient.db
      .collection<QuoteModel>('quotes')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...data } },
        { returnDocument: 'after' }
      );

    if (!updatedQuote.value) return left(new UpdateQuoteError());

    const quote = {
      id: updatedQuote.value._id.toHexString(),
      content: updatedQuote.value.content,
      usersWhoLiked: updatedQuote.value.usersWhoLiked,
      authorId: updatedQuote.value.authorId,
    };

    return right(quote);
  }
  async findAllByAuthorId(id: string): Promise<QuoteModel[]> {
    const quotes = await MongoClient.db
      .collection<Omit<QuoteModel, 'id'>>('quotes')
      .find({ authorId: id })
      .toArray();

    return quotes.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
