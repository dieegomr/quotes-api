export class QuoteNotExistError extends Error {
  constructor() {
    super('Quote does not exist');
  }
}
