import { DeleteQuoteUseCase } from '../usecases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { AuthError } from './errors';

export class DeleteQuoteController implements Controller {
  constructor(private readonly deleteQuote: DeleteQuoteUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { user, params } = httpRequest;

      if (!user) return unnauthorized(new AuthError());

      const outputOrError = await this.deleteQuote.execute(params.id, user.id);
      if (outputOrError.isLeft()) return badRequest(outputOrError.value);

      return ok(outputOrError.value);
    } catch (error) {
      return serverError();
    }
  }
}
