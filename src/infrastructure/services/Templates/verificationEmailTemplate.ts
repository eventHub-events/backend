import { KycStatus } from '../../db/models/user/UserModel';
import { IVerificationEmailTemplate } from '../../interface/IVerificationEmailtemplate';

export class VerificationEmailTemplate implements IVerificationEmailTemplate {
  generateHtml(name: string, status: KycStatus): string {
    let message = '';

    switch (status) {
      case KycStatus.Pending:
        message =
          'Your verification request has been received and is being received';
        break;
      case KycStatus.Approved:
        message =
          'Congratulations! Your verification request has been  approved';
        break;
      case KycStatus.Rejected:
        message =
          'Unfortunately, your verification request has been  rejected. Please review and resubmit.';
        break;
    }
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2>Hello, ${name}</h2>
        <p>${message}</p>
        <p><strong>Status:</strong> ${status}</p>
        <br/>
        <p>Thank you,<br/>EventHub Team</p>
      </div>
    `;
  }
}
