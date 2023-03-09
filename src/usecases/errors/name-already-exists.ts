export class NameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`A user is already using name ${name}`);
  }
}
