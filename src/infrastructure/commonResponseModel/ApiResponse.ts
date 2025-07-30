export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public statusCode: number,
    public message: string,
    public data?: T,
    public errors?: string[]
  ) {}
  static success<T>(message: string, data?: T, statusCode: number = 200) {
    return new ApiResponse(true, statusCode, message, data);
  }
  static error<T>(message:string,error?:string[], statusCode:number= 400){
      return  new ApiResponse(false,statusCode,message,error)
  }
}
