import { User } from '../../../entities';
import { UserRepository, UserViewModel } from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { MongoClient } from '../../database/mongo';
import { PersistUserError } from './errors/persist-error';

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<Either<PersistUserError, UserViewModel>> {
    const userToInsert = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const { insertedId } = await MongoClient.db
      .collection('users')
      .insertOne(userToInsert);

    const newUser = await MongoClient.db
      .collection<UserViewModel>('users')
      .findOne({ _id: insertedId });

    if (!newUser) {
      return left(new PersistUserError());
    }

    const { _id, email, name } = newUser;

    return right({ id: _id.toHexString(), name, email });
  }
}
