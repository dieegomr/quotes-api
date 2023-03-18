import { User } from '../../entities';

export type CreateQuoteInputDto = {
  content: string;
  user: User;
};

export type CreateQuoteOutputDto = {
  content: string;
  usersWhoLiked: string[];
  author: string;
};
