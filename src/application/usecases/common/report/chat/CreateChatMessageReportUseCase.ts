import { ErrorMessages } from "../../../../../constants/errorMessages";
import { BadRequestError} from "../../../../../domain/errors/common";
import { IConversationRepository } from "../../../../../domain/repositories/common/IConversationRepository";
import { IMessageRepository } from "../../../../../domain/repositories/common/IMessageRepository";
import { IReportRepository } from "../../../../../domain/repositories/common/IReportRepository";
import { ConversationType } from "../../../../../infrastructure/db/models/common/chat/ConversationModel";
import { CreateReportDTO } from "../../../../DTOs/common/report/CreateReportDTO";
import { ReportResponseDTO } from "../../../../DTOs/common/report/ReportResponseDTO";
import { IReportMapper } from "../../../../interface/mapper/common/report/IReportMapper";
import { ICreateChatMessageReportUseCase } from "../../../../interface/useCases/common/report/chat/ICreateChatMessageUseCase";

export class CreateChatMessageReportUseCase implements ICreateChatMessageReportUseCase {
    constructor(
         private _messageRepo: IMessageRepository,
         private _conversationRepo : IConversationRepository,
         private _reportRepo : IReportRepository,
         private _reportMapper : IReportMapper


    ){}
  async execute(dto: CreateReportDTO): Promise<ReportResponseDTO> {
       
      console.log("report ", dto)
    const message = await this._messageRepo.findMessageById(dto.targetId);
    if(!message) throw new BadRequestError(ErrorMessages.CHAT.CHAT_MESSAGE_NOT_FOUND);
    
     if (message.senderId === dto.reporterId) {
      throw new BadRequestError(ErrorMessages.CHAT.REPORT_OWN_MESSAGE_ERROR);
    };
     if( dto.mode === ConversationType.PRIVATE){
           const isParticipant = await this._conversationRepo.isParticipant(dto.chatId!, dto.reporterId);

        if (!isParticipant) {
      throw new BadRequestError(ErrorMessages.CHAT.USERID_NOT_FOUND_IN_CHAT);
    }
     }
    
       const reportEntity  = this._reportMapper.toEntity(dto);
      


     const created = await this._reportRepo.createReport(reportEntity);
  return this._reportMapper.toResponseDTO(created);



  }
}