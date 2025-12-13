import { UploadDocumentResponseDTO } from '../../DTOs/admin/UploadDocumentResponseDTO';
import { UserWithDocumentsResponseDTO } from '../../DTOs/admin/UserWithDocumentsResponseDTO';
import { UploadDocumentDTO } from '../../DTOs/organizer/DocumentDTO';
import { UpdateDocumentRequestDTO } from '../../DTOs/organizer/UpdateDocumentRequestDto';
import { IUploadDocumentRepository } from '../../../domain/repositories/organizer/IUploadDocumentRepository';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { CustomError } from '../../../infrastructure/errors/errorClass';
import { HttpStatusCode } from '../../../infrastructure/interface/enums/HttpStatusCode';
import {
  organizerUploadDocumentSchema,
  organizerUploadDocumentUpdateSchema,
} from '../../../infrastructure/validation/schemas/organizer/organizerUploadDocumentSchema';
import { IOrganizerUploadDocumentMapper } from '../../interface/useCases/admin/IOrganizerUploadDocumentMapper';
import { IUploadDocumentsMapper } from '../../interface/useCases/organizer/IUploadDocumentsMapper';
import { IUploadDocumentUseCase } from '../../interface/useCases/organizer/IUploadDocumentUseCase_temp';

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
      throw new CustomError(
        'Failed to save document data',
        HttpStatusCode.INTERNAL_SERVER_ERROR
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
      throw new CustomError(
        'Failure in  fetching Userdata',
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
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
      throw new CustomError(
        'Document not found or could not be deleted',
        HttpStatusCode.NOT_FOUND
      );
    return deleteDocument;
  }
  async updateUploadedDocument(
    documentId: string,
    dto: UpdateDocumentRequestDTO
  ): Promise<UploadDocumentResponseDTO> {
    const validatedDto = organizerUploadDocumentUpdateSchema.parse(dto);

    if (!validatedDto.url) {
      throw new CustomError(
        'Document Url is required',
        HttpStatusCode.BAD_REQUEST
      );
    }

    const updateData =
      this._singleDocumentMapper.toEntityForUpdate(validatedDto);

    const updatedDocument = await this._uploadDocumentRepo.updateDocument(
      documentId,
      updateData
    );

    if (!updatedDocument) {
      throw new CustomError(
        'Document not found or could not be updated',
        HttpStatusCode.NOT_FOUND
      );
    }

    return this._singleDocumentMapper.toResponse(updatedDocument);
  }
}
