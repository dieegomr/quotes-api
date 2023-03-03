export class JwtError extends Error {
  constructor() {
    super('Something wrong verifyng JWT');
  }
}
