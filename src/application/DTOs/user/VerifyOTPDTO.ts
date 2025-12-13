export class VerifyOtpDto {
  email: string;

  otp: string;

  constructor(data: Partial<VerifyOtpDto>) {
    if (!data.email) throw new Error('Email is required');
    if (!data.otp || data.otp?.length !== 6)
      throw new Error('Valid 6-digit OTP is required');

    this.email = data.email;
    this.otp = data.otp;
  }
}
