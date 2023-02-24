export class DifferentUserAccountError extends Error {
  constructor() {
    super('This account does not belong to the current user');
  }
}
