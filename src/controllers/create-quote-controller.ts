import { CreateQuoteUseCase } from '../usecases';
import { CreateQuoteInputDto } from '../usecases/dtos';
import {
  badRequest,
  Controller,
  CreateQuoteRequest,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
} from './contracts';
import { MissingParameterError } from './errors';

export class CreateQuoteController implements Controller {
  constructor(private readonly createQuote: CreateQuoteUseCase) {}
  async handle(
    httpRequest: HttpRequest<CreateQuoteRequest>
  ): Promise<HttpResponse> {
    try {
      const { body, user } = httpRequest;

      if (!body.content) return badRequest(new MissingParameterError());

      const createQuoteDto: CreateQuoteInputDto = {
        content: body.content,
        user: user,
      };

      const output = await this.createQuote.execute(createQuoteDto);
      if (output.isLeft()) return badRequest(output.value);

      return ok(output.value);
    } catch (error) {
      return serverError();
    }
  }
}
