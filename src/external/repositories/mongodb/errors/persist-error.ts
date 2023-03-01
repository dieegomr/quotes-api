export class PersistUserError extends Error {
  constructor() {
    super('It was not possible to save the user on database');
  }
}
