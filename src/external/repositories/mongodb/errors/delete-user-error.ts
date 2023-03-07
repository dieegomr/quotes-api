export class DeleteUserError extends Error {
  constructor() {
    super('It was not possible to delete the user');
  }
}
