import { UpdateOrganizerOverallVerificationStatusDTO } from '../../DTOs/admin/OrganizerOverallVerificationDTO';
import { OrganizerVerificationResponseDTO } from '../../DTOs/admin/OrganizerVerificationResponseDTO';
import { UpdatedUploadDocumentResponseDTO } from '../../DTOs/admin/UpdatedUploadedDocumentDTO';
import { UploadDocumentUpdateDTO } from '../../DTOs/admin/UploadDocumentUpdateDTO';
import { CompleteOrganizerDetailResponseDTO } from '../../DTOs/admin/UserWithOrganizerProfileDTO';
import { UserResponseDTO } from '../../DTOs/user/UserResponseDTO';
import { UserRole } from '../../../domain/enums/user/userRoles';
import { IOrganizerProfileRepository } from '../../../domain/repositories/organizer/IOrganizerProfileRepository';
import { IUploadDocumentRepository } from '../../../domain/repositories/organizer/IUploadDocumentRepository';
import { IUserQueryRepository } from '../../../domain/repositories/user/IUserQueryRepository';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { KycStatus } from '../../../infrastructure/db/models/user/UserModel';
import { HandleErrorUtility } from '../../../utils/HandleErrorUtility';
import { IOrganizerVerificationMapper } from '../../interface/useCases/admin/IOrganizerVerificationMapper';
import { IOrganizerVerificationUseCase } from '../../interface/useCases/admin/IOrganizerVerificationUseCase';
import { ErrorMessages } from '../../../constants/errorMessages';
import { IUserMapper } from '../../interface/useCases/user/mapper/IUserMapper';

export class OrganizerVerificationUseCase implements IOrganizerVerificationUseCase {
  constructor(
    private _organizerProfileRepo: IOrganizerProfileRepository,
    private _uploadDocumentRepo: IUploadDocumentRepository,
    private _userRepository: IUserRepository,
    private _userQueryRepo: IUserQueryRepository,
    private _verificationMapper: IOrganizerVerificationMapper,
    private _userMapper: IUserMapper
  ) {}

  async getOrganizerVerificationDetails(
    organizerId: string
  ): Promise<OrganizerVerificationResponseDTO> {
    try {
      const organizerDetails =
        await this._organizerProfileRepo.getProfileWithUser(organizerId);

      const organizerDocs =
        await this._uploadDocumentRepo.findDocuments(organizerId);

      if (!organizerDetails || !organizerDocs)
        throw new Error(ErrorMessages.ORGANIZER.NOT_FOUND);

      const { profile, user } = organizerDetails;

      const result = this._verificationMapper.toResponse(
        profile,
        user,
        organizerDocs
      );
      console.log(result);
      return result;
    } catch (error: unknown) {
      const err = HandleErrorUtility.handleError(error);
      throw err;
    }
  }
  async getPendingOrganizers(): Promise<{
    users: Omit<UserResponseDTO, 'phone' | 'password'>[];
  }> {
    try {
      const pendingOrganizer = await this._userRepository.findAllWithFilter({
        role: UserRole.ORGANIZER,
        kycStatus: KycStatus.Pending,
      });
      if (!pendingOrganizer)
        throw new Error(ErrorMessages.ORGANIZER.PENDING_ORGANIZER_NOT_EXIST);

      const organizers = this._userMapper.toResponseDTOList(pendingOrganizer);
      return { users: organizers };
    } catch (error: unknown) {
      const err = HandleErrorUtility.handleError(error);
      throw err;
    }
  }
  async getPendingOrganizersWithProfile(): Promise<
    CompleteOrganizerDetailResponseDTO[]
  > {
    try {
      const organizerDetails =
        await this._userQueryRepo.findPendingOrganizersWithProfile();

      const result =
        this._verificationMapper.toOrganizerDetailsResponse(organizerDetails);

      return result;
    } catch (err: unknown) {
      const error = HandleErrorUtility.handleError(err);
      throw new Error(error);
    }
  }

  async updateDocumentStatus(
    organizerId: string,
    data: UploadDocumentUpdateDTO
  ): Promise<UpdatedUploadDocumentResponseDTO> {
    try {
      const updateDoc =
        this._verificationMapper.toDomainForUploadDocumentStatus(data);
      const updatedDoc = await this._uploadDocumentRepo.updateDocument(
        organizerId,
        updateDoc
      );
      return this._verificationMapper.toResponseAfterUpdate(updatedDoc);
    } catch (err: unknown) {
      const error = HandleErrorUtility.handleError(err);
      throw new Error(error);
    }
  }
  async updateOverallVerificationStatus(
    organizerId: string,
    data: UpdateOrganizerOverallVerificationStatusDTO
  ): Promise<string> {
    try {
      const { user, profile } = data;
      await Promise.all([
        this._userRepository.updateUser(organizerId, user),
        this._organizerProfileRepo.updateProfile(organizerId, profile),
      ]);
      return ErrorMessages.ORGANIZER.OVER_ALL_STATUS_UPDATE_SUCCESS;
    } catch (error) {
      const err = HandleErrorUtility.handleError(error);
      throw new Error(err);
    }
  }
}
