import { BlankOrganizerProfileDTO } from '../../../DTOs/organizer/BlackOrganizerProfileDTO';

import { IOrganizerProfileRepository } from '../../../../domain/repositories/organizer/IOrganizerProfileRepository';

import { CustomError } from '../../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../../infrastructure/interface/enums/HttpStatusCode';
import { IOrganizerBlankProfileCreationUseCase } from '../../../interface/useCases/organizer/IOrganizerBlankProfileCreationUseCase';
import { OrganizerProfileMapper } from '../../../mapper/organizer/OrganizerProfileMapper';
import { ErrorMessages } from '../../../../constants/errorMessages';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';

export class OrganizerBlankProfileCreationUseCase implements IOrganizerBlankProfileCreationUseCase {
  constructor(private _profileRepo: IOrganizerProfileRepository) {}

  async createBlankProfile(organizerId: string): Promise<string> {
    const blankProfile: BlankOrganizerProfileDTO = {
      organizerId,
      organization: '',
      website: '',
      bio: '',
      location: '',
      profilePicture: '',
      trustScore: 0,
      totalEarnings: 0,
      kycVerified: false,
    };
    const organizerEntityData = OrganizerProfileMapper.toDomain(blankProfile);
    const result = await this._profileRepo.createProfile(organizerEntityData);

    if (!result) {
      throw new CustomError(
        ErrorMessages.ORGANIZER.PROFILE_CREATION_FAILED,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
    return ResponseMessages.PROFILE.PROFILE_CREATION_SUCCESS;
  }
}
