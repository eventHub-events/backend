import { z } from 'zod';
import { KycStatus } from '../../../infrastructure/db/models/user/UserModel';

const kycStatusEnum = z.enum(['Pending', 'Approved', 'Rejected'] as const);

const UpdateOrganizerOverallVerificationStatusSchema = z.object({
  user: z.object({
    kycStatus: kycStatusEnum,
    isVerified: z.boolean(),
  }),
  profile: z.object({
    kycVerified: z.boolean(),
  }),
});

export type UpdateOrganizerOverallVerificationStatusDTOInput = z.infer<
  typeof UpdateOrganizerOverallVerificationStatusSchema
>;
export class UpdateOrganizerOverallVerificationStatusDTO {
  user: {
    kycStatus: KycStatus;
    isVerified: boolean;
  };

  profile: {
    kycVerified: boolean;
  };

  private constructor(data: UpdateOrganizerOverallVerificationStatusDTOInput) {
    this.user = {
      kycStatus: data.user.kycStatus as KycStatus,
      isVerified: data.user.isVerified,
    };
    this.profile = data.profile;
  }
  static create(data: unknown): UpdateOrganizerOverallVerificationStatusDTO {
    const parsed =
      UpdateOrganizerOverallVerificationStatusSchema.safeParse(data);

    if (!parsed.success) {
      throw parsed.error;
    }
    return new UpdateOrganizerOverallVerificationStatusDTO(parsed.data);
  }
}
