import { GetUserProfileUseCase } from '../usecases/get-user-profile-usecase';
import {
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { Controller } from './contracts/controller';
import { AuthError } from './errors';

export class GetUserProfileController implements Controller {
  constructor(private readonly getUserProfile: GetUserProfileUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { user } = httpRequest;
      if (!user) return unnauthorized(new AuthError());

      const output = await this.getUserProfile.execute(user.id);

      return ok(output);
    } catch (error) {
      return serverError();
    }
  }
}
