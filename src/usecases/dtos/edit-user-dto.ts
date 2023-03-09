import { User } from '../../entities';

export type EditUserInputDto = { name?: string; email?: string };

export type EditUserOutputDto = User;
