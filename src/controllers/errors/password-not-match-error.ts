export class PasswordNotMatchError extends Error {
  constructor() {
    super('The newPassword and passwordConfirm does not match');
  }
}
