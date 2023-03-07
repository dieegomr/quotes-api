import { DeleteUserUseCase } from '../usecases/delete-user-usecase';
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

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUserUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { user } = httpRequest;
      if (!user) return unnauthorized(new AuthError());

      const outputOrError = await this.deleteUser.execute(user.id);
      if (outputOrError.isLeft()) return badRequest(outputOrError.value);

      return ok(outputOrError.value);
    } catch (error) {
      return serverError();
    }
  }
}
