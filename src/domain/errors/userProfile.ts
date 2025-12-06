import { CustomError } from "../../infrastructure/errors/errorClass";

export class ForbiddenError extends CustomError {
  constructor(message: string, errCode = "USER_FORBIDDEN", role?: string) {
    super(message, 403, errCode, role);
  }
}
export class UpdateFailedError extends Error{}
export class DataFetchError extends Error {}