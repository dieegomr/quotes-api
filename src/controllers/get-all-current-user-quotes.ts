import { GetAllCurrentUserQuotesUseCase } from '../usecases/get-all-current-user-quotes-usecase';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { AuthError } from './errors';

export class GetAllCurrentUserQuotesController implements Controller {
  constructor(
    private readonly getAllCurrentUserQuotes: GetAllCurrentUserQuotesUseCase
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { user } = httpRequest;
      if (!user) return unnauthorized(new AuthError());

      const output = await this.getAllCurrentUserQuotes.execute(user.id);

      return ok(output);
    } catch (error) {
      return serverError();
    }
  }
}
