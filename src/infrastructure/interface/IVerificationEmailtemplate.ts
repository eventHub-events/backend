import { KycStatus } from '../db/models/user/UserModel';

export interface IVerificationEmailTemplate {
  generateHtml(name: string, status: KycStatus): string;
}
