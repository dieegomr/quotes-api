export class PersistUserError extends Error {
  constructor() {
    super('It was not possible to save a user on database');
  }
}
