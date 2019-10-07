export class UnauthenticatedError extends Error {
  constructor() {
    super();
    this.message = 'Unauthenticated user';
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Unauthorized user';
  }
}
