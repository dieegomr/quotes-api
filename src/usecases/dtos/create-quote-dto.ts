import { User } from '../../entities';

export type CreateQuoteInputDto = {
  content: string;
  author: User;
};

export type CreateQuoteOutputDto = {
  content: string;
  usersWhoLiked: string[];
  author: User;
};
