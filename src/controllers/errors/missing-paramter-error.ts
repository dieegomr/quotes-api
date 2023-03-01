export class MissingParameterError extends Error {
  constructor() {
    super('It is missing a parameter');
  }
}
