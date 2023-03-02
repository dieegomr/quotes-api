import { LoginUseCase } from '../usecases';
import {
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { Controller } from './contracts/controller';
import { LoggedUserViewModel } from './contracts/logged-user';

export class LoginController implements Controller {
  constructor(private readonly login: LoginUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      const loggedUserOrError = await this.login.execute({ email, password });
      if (loggedUserOrError.isLeft())
        return unnauthorized(loggedUserOrError.value);
      const loggedUser: LoggedUserViewModel = loggedUserOrError.value;

      return ok(loggedUser);
    } catch (error) {
      return serverError();
    }
  }
}
