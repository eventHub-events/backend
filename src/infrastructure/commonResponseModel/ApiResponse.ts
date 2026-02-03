export class ApiResponse<T> {
  constructor(
    public success: boolean,
    
    public message: string,
    public data?: T,
    public errCode?: string,
    public role?: string,
    public errors?: string[]
  ) {}

  static success<T>(message: string, data?: T) {
    return new ApiResponse(true, message, data);
  }

  static error<T>(
    message: string,
    
    errCode?: string,
    role?: string,
    errors?: string[]
  ) {
    return new ApiResponse<T>(
      false,
      
      message,
      undefined,
      errCode,
      role,
      errors
    );
  }
}
