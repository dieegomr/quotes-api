export class PersistDataError extends Error {
  constructor() {
    super('It was not possible to save the data on database');
  }
}
