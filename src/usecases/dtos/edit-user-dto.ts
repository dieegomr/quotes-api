import { User } from '../../entities';

export type EditUserInputDto = {
  name?: string;
  email?: string;
  password?: string;
};

export type EditUserOutputDto = User;
