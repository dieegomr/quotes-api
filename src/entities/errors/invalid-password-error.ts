export class InvalidPasswordError extends Error {
  constructor() {
    super(
      'Invalid password format. It must have at least 8 characters with at least one digit (0-9), and at least one uppercase letter'
    );
  }
}
