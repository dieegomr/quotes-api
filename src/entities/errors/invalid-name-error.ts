export class InvalidNameError extends Error {
  constructor(name: string) {
    super('Name is invalid.');
  }
}
