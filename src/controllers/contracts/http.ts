export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export type HttpRequest<T = any> = {
  body: T;
};

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error.message,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data: data,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  data: 'Something went wrong',
});
