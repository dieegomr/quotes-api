export class UpdateUserError extends Error {
  constructor() {
    super('It was not possible to update the user');
  }
}
