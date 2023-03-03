export class AuthError extends Error {
  constructor() {
    super('You do not have authorization to access this information');
  }
}
