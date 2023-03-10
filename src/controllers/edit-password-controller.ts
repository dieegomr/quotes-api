import { EditPasswordUseCase } from '../usecases/edit-password-usercase';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  unnauthorized,
} from './contracts';
import {
  AuthError,
  MissingParameterError,
  PasswordNotMatchError,
} from './errors';

export class EditPasswordController implements Controller {
  constructor(private readonly editPassword: EditPasswordUseCase) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const { body, user } = httpRequest;
    if (!user) return badRequest(new AuthError());

    if (!body.newPassword || !body.passwordConfirm)
      return badRequest(new MissingParameterError());

    if (body.newPassword !== body.passwordConfirm)
      return unnauthorized(new PasswordNotMatchError());

    await this.editPassword.execute({
      newPassword: body.newPassword,
      userId: user.id,
      currentPassword: user.password.value,
    });
  }
}
