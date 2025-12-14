import { UploadDocumentResponseDTO } from '../../DTOs/admin/UploadDocumentResponseDTO';
import { UserWithDocumentsResponseDTO } from '../../DTOs/admin/UserWithDocumentsResponseDTO';
import { UploadDocumentDTO } from '../../DTOs/organizer/DocumentDTO';
import { UpdateDocumentRequestDTO } from '../../DTOs/organizer/UpdateDocumentRequestDto';
import { IUploadDocumentRepository } from '../../../domain/repositories/organizer/IUploadDocumentRepository';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import {
  organizerUploadDocumentSchema,
  organizerUploadDocumentUpdateSchema,
} from '../../../infrastructure/validation/schemas/organizer/organizerUploadDocumentSchema';
import { IOrganizerUploadDocumentMapper } from '../../interface/useCases/admin/IOrganizerUploadDocumentMapper';
import { IUploadDocumentsMapper } from '../../interface/useCases/organizer/IUploadDocumentsMapper';
import { IUploadDocumentUseCase } from '../../interface/useCases/organizer/IUploadDocumentUseCase_temp';
import {
  BadRequestError,
  CreationFailedError,
  NotFoundError,
  UpdateFailedError,
} from '../../../domain/errors/common';
import { ErrorMessages } from '../../../constants/errorMessages';

export class UploadDocumentUseCase implements IUploadDocumentUseCase {
  constructor(
    private _uploadDocumentRepo: IUploadDocumentRepository,
    private _singleDocumentMapper: IOrganizerUploadDocumentMapper,
    private _multipleDocumentsMapper: IUploadDocumentsMapper,
    private _userRepo: IUserRepository
  ) {}
  async saveUploadedDocument(
    dto: UploadDocumentDTO
  ): Promise<UploadDocumentResponseDTO> {
    const validatedDTO = organizerUploadDocumentSchema.parse(dto);
    const documentEntity = this._singleDocumentMapper.toEntity(validatedDTO);

    const savedDocument =
      await this._uploadDocumentRepo.saveDocumentData(documentEntity);

    if (!savedDocument) {
      throw new CreationFailedError(
        ErrorMessages.UPLOAD_DOCUMENT.FAILED_TO_SAVE
      );
    }

    return this._singleDocumentMapper.toResponse(savedDocument);
  }
  async getUploadedDocuments(
    organizerId: string
  ): Promise<UserWithDocumentsResponseDTO> {
    const [docs, User] = await Promise.all([
      this._uploadDocumentRepo.findDocuments(organizerId),
      this._userRepo.findUserById(organizerId),
    ]);

    if (!User) {
      throw new NotFoundError(ErrorMessages.USER.NOT_FOUND);
    }

    if (!docs || docs.length === 0) {
      return this._multipleDocumentsMapper.toResponse([], User);
    }

    return this._multipleDocumentsMapper.toResponse(docs, User);
  }
  async deleteUploadedDocument(documentId: string): Promise<string> {
    const deleteDocument =
      await this._uploadDocumentRepo.deleteDocument(documentId);

    if (!deleteDocument)
      throw new NotFoundError(ErrorMessages.UPLOAD_DOCUMENT.DOCUMENT_NOT_FOUND);
    return deleteDocument;
  }
  async updateUploadedDocument(
    documentId: string,
    dto: UpdateDocumentRequestDTO
  ): Promise<UploadDocumentResponseDTO> {
    const validatedDto = organizerUploadDocumentUpdateSchema.parse(dto);

    if (!validatedDto.cloudinaryPublicId) {
      throw new BadRequestError(
        ErrorMessages.CLOUDINARY.CLOUDINARY_PUBLIC_ID_REQUIRED
      );
    }

    const updateData =
      this._singleDocumentMapper.toEntityForUpdate(validatedDto);

    const updatedDocument = await this._uploadDocumentRepo.updateDocument(
      documentId,
      updateData
    );

    if (!updatedDocument) {
      throw new UpdateFailedError(ErrorMessages.UPLOAD_DOCUMENT.UPDATE_FAILURE);
    }

    return this._singleDocumentMapper.toResponse(updatedDocument);
  }
}
