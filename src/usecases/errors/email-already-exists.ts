export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`A user is already using email ${email}`);
  }
}
