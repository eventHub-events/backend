import { CustomError } from '../../../../infrastructure/errors/errorClass';

export interface IErrorMapper {
  toHttp(error: Error): CustomError;
}
