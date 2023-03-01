import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
} from '../controllers/contracts/http';
import { CreateUserUseCase } from '../usecases';
import { Controller } from './contracts/controller';
import { CreateUserRequest } from './contracts/create-user';
import { MissingParameterError } from './errors';

export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUserUseCase) {}
  async handle(
    httpRequest: HttpRequest<CreateUserRequest>
  ): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;

      if (!name || !email || !password)
        return badRequest(new MissingParameterError());

      const createUserDto = {
        name,
        email,
        password,
      };

      const output = await this.createUser.execute(createUserDto);

      if (output.isLeft()) return badRequest(output.value);
      return ok(output.value);
    } catch (error) {
      return serverError();
    }
  }
}
