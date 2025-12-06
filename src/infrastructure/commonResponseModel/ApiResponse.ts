export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public statusCode: number,
    public message: string,
    public data?: T,
    public errCode?:string,
    public role?: string,
    public errors?: string[],
  ) {}

  static success<T>(message: string,  statusCode: number = 200,data?: T,) {
    return new ApiResponse(true, statusCode, message, data);
  }

  static error<T>(message:string,  statusCode:number = 400,errCode?: string,role?: string,errors?:string[]) {
    return new ApiResponse<T>(false, statusCode, message, undefined,errCode,role, errors);
  }
}
