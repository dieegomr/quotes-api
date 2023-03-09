export class WrongPasswordRouteError extends Error {
  constructor() {
    super(
      'This route is not for password updates. Please user /updateMyPassword'
    );
  }
}
