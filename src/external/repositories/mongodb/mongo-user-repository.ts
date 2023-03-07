import { ObjectId } from 'mongodb';
import { UserRepository, UserModel, CreateUserModel } from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { MongoClient } from '../../database/mongo';
import { DeleteUserError, PersistUserError } from './errors';

export class MongoUserRepository implements UserRepository {
  async findById(id: string): Promise<UserModel | null> {
    const user = await MongoClient.db
      .collection<UserModel>('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    return {
      id: user._id.toHexString(),
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  async create(
    user: CreateUserModel
  ): Promise<Either<PersistUserError, UserModel>> {
    const userToInsert = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const { insertedId } = await MongoClient.db
      .collection('users')
      .insertOne(userToInsert);

    const newUser = await MongoClient.db
      .collection<UserModel>('users')
      .findOne({ _id: insertedId });

    if (!newUser) {
      return left(new PersistUserError());
    }

    const { _id, email, name, password } = newUser;

    return right({ id: _id.toHexString(), name, email, password });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await MongoClient.db
      .collection<UserModel>('users')
      .findOne({ email: email });

    if (!user) return null;

    return {
      id: user._id.toHexString(),
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  async delete(id: string): Promise<Either<DeleteUserError, string>> {
    const { deletedCount } = await MongoClient.db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) return left(new DeleteUserError());

    return right('Successfully deleted user');
  }
}
