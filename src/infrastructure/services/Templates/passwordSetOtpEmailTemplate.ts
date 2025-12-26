import { IPasswordSetOtpTemplate } from "../../interface/Templates/IPasswordSetOtpTemplate";

export class PasswordSetOtpEmailTemplate implements IPasswordSetOtpTemplate {
  generate(params:{userName: string, otp: string, appName?: string, expiryMinutes?: number}): { subject: string; html: string; } {
      return {
         subject: '🔐 Set Your Password – OTP Verification',
          html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f6f8;
          padding: 24px;
        ">

          <div style="
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 28px;
          ">

            <h2 style="margin-top: 0;">
              Set Your Password
            </h2>

            <p>Hello ${params.userName},</p>

            <p>
              We received a request to set your password for your
              <strong>EventHub</strong> account.
            </p>

            <p>
              Please use the OTP below to continue:
            </p>

            <div style="
              text-align: center;
              margin: 24px 0;
            ">
              <span style="
                display: inline-block;
                background-color: #f1f5f9;
                padding: 14px 28px;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 6px;
                border-radius: 6px;
                color: #0f172a;
              ">
                ${params.otp}
              </span>
            </div>

            <p>
              This OTP is valid for
              <strong>${params.expiryMinutes} minutes</strong>.
              Please do not share this code with anyone.
            </p>

            <div style="
              background-color: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 12px;
              margin-top: 16px;
            ">
              If you did not request this action,
              you can safely ignore this email.
            </div>

            <p style="margin-top: 24px;">
              Regards,<br/>
              <strong>EventHub Trust & Safety Team</strong>
            </p>

          </div>
        </div>
      `,
      
      }
  }
}