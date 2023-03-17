import { InvalidQuoteContentError } from '../entities/errors';
import { QuoteRepository } from '../gateways';
import { Either, left, right } from '../shared';
import { CreateQuoteInputDto, CreateQuoteOutputDto } from './dtos';

export class CreateQuoteUseCase {
  constructor(private readonly quoteRepository: QuoteRepository) {}
  async execute(
    input: CreateQuoteInputDto
  ): Promise<Either<InvalidQuoteContentError, CreateQuoteOutputDto>> {
    const { user, content } = input;

    const quoteOrError = user.createQuote(content);
    if (quoteOrError.isLeft()) return left(quoteOrError.value);

    const createQuoteOrError = await this.quoteRepository.create(
      quoteOrError.value
    );
    if (createQuoteOrError.isLeft()) return left(createQuoteOrError.value);

    const createQuoteOutputDto: CreateQuoteOutputDto = {
      author: createQuoteOrError.value.author,
      content: createQuoteOrError.value.content.value,
      usersWhoLiked: createQuoteOrError.value.usersWhoLiked,
    };

    return right(createQuoteOutputDto);
  }
}
