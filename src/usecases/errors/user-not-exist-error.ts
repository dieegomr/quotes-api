export class UserNotExistError extends Error {
  constructor() {
    super('User does not exist');
  }
}
