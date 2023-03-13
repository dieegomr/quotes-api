import { User } from '../../entities';

export type UpdateUserInputDto = {
  name?: string;
  email?: string;
  password?: string;
};

export type UpdateUserOutputDto = User;
