export class QuoteNotBelongsMeError extends Error {
  constructor() {
    super('Quote does not belong to the current user');
  }
}
