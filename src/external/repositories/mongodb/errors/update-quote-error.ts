export class UpdateQuoteError extends Error {
  constructor() {
    super('It was not possible to update the quote');
  }
}
