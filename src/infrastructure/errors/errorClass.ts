export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly errCode?: string;
  public readonly role?: string;
  public readonly errors?: string | string[];

  constructor(
    message: string,
    statusCode: number,
    errCode?: string,
    role?: string,
    errors?: string | string[]
  ) {
    super(message);

    Object.defineProperty(this, "name", {
      value: "CustomError",
      writable: false,
      configurable: false,
    });

    this.statusCode = statusCode;
    this.errCode = errCode;  
    this.role = role;            
    this.errors = errors;

    // Fix prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
