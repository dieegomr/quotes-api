import { ObjectId } from 'mongodb';
import { User } from '../../../entities';
import { UserRepository, UserModel, CreateUserModel } from '../../../gateways';
import { Either, left, right } from '../../../shared';
import { UpdateUserInputDto } from '../../../usecases/dtos';
import { MongoClient } from '../../database/mongo';
import { DeleteUserError, PersistDataError, UpdateUserError } from './errors';

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

  async save(
    saveUserData: CreateUserModel
  ): Promise<Either<PersistDataError, UserModel>> {
    const { insertedId } = await MongoClient.db
      .collection('users')
      .insertOne(saveUserData);

    const savedUser = await MongoClient.db
      .collection<UserModel>('users')
      .findOne({ _id: insertedId });

    if (!savedUser) {
      return left(new PersistDataError());
    }

    const { _id, email, name, password } = savedUser;

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

  async update(
    id: string,
    data: UpdateUserInputDto
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
