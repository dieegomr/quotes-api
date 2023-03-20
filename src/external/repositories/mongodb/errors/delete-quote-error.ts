export class DeleteQuoteError extends Error {
  constructor() {
    super('It was not possible to delete the quote');
  }
}
