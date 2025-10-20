import { IEmailService } from '../../../application/interface/useCases/user/IEmailService';

export class EmailService {
  constructor(private _sendMailService:IEmailService) {}

  async sendMail(to:string, subject:string, body:string) {
    await this._sendMailService.sendMail(to, subject, body);
  }
}
