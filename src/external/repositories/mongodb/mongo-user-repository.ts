import { ObjectId } from 'mongodb';
import { User } from '../../../entities';
import { UserRepository, UserModel, CreateUserModel } from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { EditUserInputDto } from '../../../usecases/dtos';
import { MongoClient } from '../../database/mongo';
import { DeleteUserError, PersistUserError, UpdateUserError } from './errors';

export class MongoUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const userExists = await MongoClient.db
      .collection<UserModel>('users')
      .findOne({ _id: new ObjectId(id) });

    if (!userExists) return null;

    const userOrError = User.create({
      id: userExists._id.toHexString(),
      name: userExists.name,
      email: userExists.email,
      password: userExists.password,
    });
    if (userOrError.isLeft()) return null;

    return userOrError.value;
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

  async editUser(
    id: string,
    data: EditUserInputDto
  ): Promise<Either<UpdateUserError, Omit<UserModel, 'password'>>> {
    const updatedUser = await MongoClient.db
      .collection<UserModel>('users')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...data } },
        { returnDocument: 'after' }
      );

    if (!updatedUser.value) return left(new UpdateUserError());

    const user = {
      id: updatedUser.value._id.toHexString(),
      name: updatedUser.value.name,
      email: updatedUser.value.email,
    };

    return right(user);
  }
}
