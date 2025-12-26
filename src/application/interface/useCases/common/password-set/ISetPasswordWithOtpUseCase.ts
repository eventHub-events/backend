export interface ISetPasswordWithOtpUseCase {
  execute(token : string, otp :string, newPassword :string, userId :string) : Promise<void>;
}