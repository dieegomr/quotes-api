import { User } from '../../entities';

export type CreateQuoteInputDto = {
  content: string;
  user: User;
};

export type CreateQuoteOutputDto = {
  id: string;
  content: string;
  usersWhoLiked: string[];
  authorId: string;
};
