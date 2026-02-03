import { OrganizerProfileDTO } from '../../DTOs/organizer/OrganizerProfileDTO';
import { UpdatedOrganizerProfileFormResponseDTO } from '../../DTOs/organizer/OrganizerProfileFormDTO';
import { OrganizerProfileResponseDTO } from '../../DTOs/organizer/OrganizerProfileResponseDTO';
import { IOrganizerProfileRepository } from '../../../domain/repositories/organizer/IOrganizerProfileRepository';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import { organizerProfileSchema } from '../../../infrastructure/validation/schemas/organizer/organizerProfileSchema';
import { IOrganizerProfileUseCase } from '../../interface/useCases/organizer/IOrganizerProfileUseCase';
import { OrganizerProfileMapper } from '../../mapper/organizer/OrganizerProfileMapper';
import { ErrorMessages } from '../../../constants/errorMessages';

export class OrganizerProfileUseCase implements IOrganizerProfileUseCase {
  constructor(
    private _organizerProfileRepo: IOrganizerProfileRepository,
    private _userRepo: IUserRepository
  ) {}

  async updateOrganizerProfile(
    id: string,
    data: Partial<OrganizerProfileDTO>
  ): Promise<UpdatedOrganizerProfileFormResponseDTO> {
    const validatedData = organizerProfileSchema.parse(data);

    const dto = new OrganizerProfileDTO(validatedData);

    const updateDetails = OrganizerProfileMapper.toUpdateForm(dto);

    const { profileData, organizerBasicData } = updateDetails;

    const [updatedData, updatedBasicData] = await Promise.all([
      this._organizerProfileRepo.updateProfile(id, profileData),
      this._userRepo.updateUser(id, organizerBasicData),
    ]);

    if (!updatedData || !updatedBasicData) {
      throw new CustomError(
        ErrorMessages.PROFILE.UPDATE_FAILURE
        ,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    const finalData = OrganizerProfileMapper.toUpdateResponseForm(
      updatedData,
      updatedBasicData
    );

    return finalData;
  }
  async getOrganizerProfile(
    id: string
  ): Promise<OrganizerProfileResponseDTO | null> {
    const profileData = await this._organizerProfileRepo.getProfileWithUser(id);

    if (!profileData) {
      throw new CustomError(
        ErrorMessages.PROFILE.PROFILE_FETCH_FAILURE,
        
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
    const { profile, user } = profileData;

    return OrganizerProfileMapper.toResponse(profile, user);
  }
}
