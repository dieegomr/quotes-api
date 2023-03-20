import { Content } from '../entities';
import { InvalidQuoteContentError } from '../entities/errors';
import { QuoteRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { CreateQuoteInputDto, CreateQuoteOutputDto } from './dtos';

export class CreateQuoteUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}
  async execute(
    input: CreateQuoteInputDto
  ): Promise<Either<InvalidQuoteContentError, CreateQuoteOutputDto>> {
    const contentOrError = Content.create(input.content);
    if (contentOrError.isLeft()) return left(contentOrError.value);
    const contentObj = contentOrError.value;

    const usersWhoLiked: string[] = [];

    const createQuoteOrError = await this.quoteRepository.create({
      content: contentObj.value,
      authorId: input.user.id,
      usersWhoLiked,
    });
    if (createQuoteOrError.isLeft()) return left(createQuoteOrError.value);

    const createQuoteOutputDto: CreateQuoteOutputDto = {
      id: createQuoteOrError.value.id,
      authorId: createQuoteOrError.value.authorId,
      content: createQuoteOrError.value.content,
      usersWhoLiked: createQuoteOrError.value.usersWhoLiked,
    };

    return right(createQuoteOutputDto);
  }
}
