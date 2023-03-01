import { UserRepository, UserModel, CreateUserModel } from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { MongoClient } from '../../database/mongo';
import { PersistUserError } from './errors/persist-error';

export class MongoUserRepository implements UserRepository {
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

    return user;
  }
}
