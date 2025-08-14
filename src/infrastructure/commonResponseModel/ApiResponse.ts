export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public statusCode: number,
    public message: string,
    public data?: T,
    public errors?: string[],
  ) {}

  static success<T>(message: string,  statusCode: number = 200,data?: T,) {
    return new ApiResponse(true, statusCode, message, data);
  }

  static error<T>(message:string,  statusCode:number = 400,errors?:string[]) {
    return new ApiResponse<T>(false, statusCode, message, undefined, errors);
  }
}
