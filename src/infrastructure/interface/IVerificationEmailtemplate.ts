import { KycStatus } from "../db/models/UserModel";

export interface IVerificationEmailTemplate {
  generateHtml(name:string, status: KycStatus): string;
}