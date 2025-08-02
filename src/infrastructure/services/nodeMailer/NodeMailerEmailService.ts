import dotenv from 'dotenv';
import nodemailer, { createTransport, Transporter } from 'nodemailer';
import { IEmailService } from '../../../application/interface/user/IEmailService';

dotenv.config();

export class NodeMailerEmailService implements IEmailService {
  private mailTransporter: Transporter;

  private SMTP_USER;

  private SMTP_PASS;

  private SMTP_HOST;

  private SMTP_PORT;

  constructor() {
    this.SMTP_USER = process.env.SMTP_USER || 'smtp.email.com';
    this.SMTP_PASS = process.env.SMTP_PASS || '';
    this.SMTP_HOST = process.env.SMTP_HOST;
    this.SMTP_PORT = process.env.SMTP_PORT;

    if (!this.SMTP_USER || !this.SMTP_PASS) {
      throw new Error('Email credentials are missing from .env');
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
      from: process.env.SMTP_USER,
      to,
      subject,
      html: body,
    });

    console.log(`Email sent  to :${to}`);
  }
}
