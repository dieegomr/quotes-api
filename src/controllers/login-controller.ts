import { LoginUseCase } from '../usecases';
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { Controller } from './contracts/controller';
import { MissingParameterError } from './errors';

export class LoginController implements Controller {
  constructor(private readonly login: LoginUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) return badRequest(new MissingParameterError());

      const loginDto = { email, password };

      const output = await this.login.execute(loginDto);
      if (output.isLeft()) {
        return unnauthorized(output.value);
      }

      return ok(output.value);
    } catch (error) {
      return serverError();
    }
  }
}
