export class DifferentAuthorError extends Error {
  constructor() {
    super('This quote does not bellongs to the current user');
  }
}
