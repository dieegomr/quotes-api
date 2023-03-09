import { EditUserUseCase } from '../usecases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { AuthError, WrongPasswordRouteError } from './errors';

export class EditUserController implements Controller {
  constructor(private readonly editUser: EditUserUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const allowedFieldsToBeUpdated = ['name', 'email'];

      if (httpRequest.body.password || httpRequest.body.passwordConfirm)
        return badRequest(new WrongPasswordRouteError());

      const { user, body } = httpRequest;
      if (!user) return unnauthorized(new AuthError());

      const filteredBody = this.filteredBody(body, ...allowedFieldsToBeUpdated);

      const outputOrError = await this.editUser.execute(user.id, filteredBody);
      if (outputOrError.isLeft()) return badRequest(outputOrError.value);

      return ok(outputOrError.value);
    } catch (error) {
      return serverError();
    }
  }

  filteredBody(obj: { [key: string]: unknown }, ...alowedFields: string[]) {
    const newObj: { [key: string]: unknown } = {};
    Object.keys(obj).forEach((el) => {
      if (alowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  }
}
