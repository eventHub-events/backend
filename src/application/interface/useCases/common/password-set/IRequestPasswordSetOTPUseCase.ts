export interface IRequestPasswordSetOTPUseCase {
  execute(userId : string): Promise<{ setPasswordToken :string}>;
}