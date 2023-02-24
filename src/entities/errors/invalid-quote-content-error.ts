export class InvalidQuoteContentError extends Error {
  constructor() {
    super('Quote content is invalid');
  }
}
