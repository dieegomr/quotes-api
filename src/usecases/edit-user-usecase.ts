import { User } from '../entities';
import { InvalidEmailError, InvalidNameError } from '../entities/errors';
import { UserModel, UserRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { EditUserInputDto } from './dtos';
import {
  EmailAlreadyExistsError,
  NameAlreadyExistsError,
  UserNotExistError,
} from './errors';

export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    id: string,
    editUserDto: EditUserInputDto
  ): Promise<
    Either<
      | UserNotExistError
      | InvalidNameError
      | InvalidEmailError
      | NameAlreadyExistsError
      | EmailAlreadyExistsError,
      Omit<UserModel, 'password'>
    >
  > {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) return left(new UserNotExistError());

    if (editUserDto.email && editUserDto.email !== userExists.email.value) {
      const emailAlreadyExists = await this.userRepository.findByEmail(
        editUserDto.email
      );
      if (emailAlreadyExists)
        return left(new EmailAlreadyExistsError(editUserDto.email));
    }

    if (editUserDto.name && editUserDto.name !== userExists.name.value) {
      const nameAlreadyExists = await this.userRepository.findByEmail(
        editUserDto.name
      );
      if (nameAlreadyExists)
        return left(new NameAlreadyExistsError(editUserDto.name));
    }

    const userOrError = userExists.editUser(
      editUserDto.name ?? userExists.name.value,
      editUserDto.email ?? userExists.email.value
    );
    if (userOrError.isLeft()) return left(userOrError.value);
    const userToEdit: User = userOrError.value;

    const editedUser = await this.userRepository.editUser(id, {
      name: userToEdit.name.value,
      email: userToEdit.email.value,
    });
    if (editedUser.isLeft()) return left(editedUser.value);

    return right({
      id: editedUser.value.id,
      email: editedUser.value.email,
      name: editedUser.value.name,
    });
  }
}
