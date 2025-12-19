import { createTransport, Transporter } from 'nodemailer';
import { IEmailService } from '../../../application/interface/useCases/user/IEmailService';
import { ErrorMessages } from '../../../constants/errorMessages';
import { ENV } from '../../config/common/env';

export class NodeMailerEmailService implements IEmailService {
  private mailTransporter: Transporter;

  private SMTP_USER;

  private SMTP_PASS;

  private SMTP_HOST;

  private SMTP_PORT;

  constructor() {
    this.SMTP_USER = ENV.SMTP_USER || 'smtp.email.com';
    this.SMTP_PASS = ENV.SMTP_PASS || '';
    this.SMTP_HOST = ENV.SMTP_HOST;
    this.SMTP_PORT = ENV.SMTP_PORT;

    if (!this.SMTP_USER || !this.SMTP_PASS) {
      throw new Error(ErrorMessages.EMAIL.CREDENTIALS_MISSING);
    }

    this.mailTransporter = createTransport({
      host: this.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: this.SMTP_USER,
        pass: this.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
      logger: false,
    });
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    await this.mailTransporter.sendMail({
      from: ENV.SMTP_USER,
      to,
      subject,
      html: body,
    });

    console.log(`Email sent  to :${to}`);
  }
}
