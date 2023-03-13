import { UpdatePasswordInputDto } from '../usecases/dtos';
import { UpdatePasswordUseCase } from '../usecases/update-password-usercase';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  unnauthorized,
} from './contracts';
import {
  AuthError,
  MissingParameterError,
  PasswordNotMatchError,
} from './errors';

export class UpdatePasswordController implements Controller {
  constructor(private readonly updatePassword: UpdatePasswordUseCase) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const { body, user } = httpRequest;
    if (!user) return badRequest(new AuthError());

    if (!body.newPassword || !body.passwordConfirm)
      return badRequest(new MissingParameterError());

    if (body.newPassword !== body.passwordConfirm)
      return unnauthorized(new PasswordNotMatchError());

    const editPasswordInputDto: UpdatePasswordInputDto = {
      newPassword: body.newPassword,
      userId: user.id,
      currentPassword: user.password.value,
    };

    const updatedOrError = await this.updatePassword.execute(
      editPasswordInputDto
    );
    if (updatedOrError.isLeft()) return unnauthorized(updatedOrError.value);

    return ok(updatedOrError.value);
  }
}
