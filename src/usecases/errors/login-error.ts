export class LoginError extends Error {
  constructor() {
    super('Incorrect Email or Password');
  }
}
