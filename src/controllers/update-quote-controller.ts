import { UpdateQuoteUseCase } from '../usecases';
import { UpdateQuoteInputDto } from '../usecases/dtos';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unnauthorized,
} from './contracts';
import { AuthError, MissingParameterError } from './errors';

export class UpdateQuoteController implements Controller {
  constructor(private readonly updateQuote: UpdateQuoteUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const allowedFieldsToBeUpdated = ['content'];

      const { user, body, params } = httpRequest;
      if (!user) return unnauthorized(new AuthError());

      const filteredBody = this.filteredBody(
        body,
        ...allowedFieldsToBeUpdated
      ) as UpdateQuoteInputDto;

      if (!filteredBody.content) return badRequest(new MissingParameterError());

      const outputOrError = await this.updateQuote.execute(
        params.id,
        user.id,
        filteredBody
      );
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
