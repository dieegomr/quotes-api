export class UserNotLoggedInError extends Error {
  constructor() {
    super('You are not logged in! Please, log in to get access');
  }
}
