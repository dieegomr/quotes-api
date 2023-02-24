export class InvalidNameError extends Error {
  constructor() {
    super('Name is invalid.');
  }
}
