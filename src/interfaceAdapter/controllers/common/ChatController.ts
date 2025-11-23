import { NextFunction, Response } from "express";
import { IGetCommunityChatUseCase } from "../../../application/interface/useCases/common/chat/IGetCommunityChatUseCase";
import { IGetMessagesUseCase } from "../../../application/interface/useCases/common/chat/IGetMessagesUseCase";
import { ISendMessageUseCase } from "../../../application/interface/useCases/common/chat/ISendMessageUseCase";
import { IStartPrivateChatUseCase } from "../../../application/interface/useCases/common/chat/IStartPrivateChatUseCase";
import { IAuthenticatedRequest } from "../../../infrastructure/interface/IAuthenticatedRequest";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";
import { NotFoundError } from "../../../domain/errors/common";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { SendMessageRequestDTO } from "../../../application/DTOs/common/chat/SentMessageRequestDTO";
import { IGetOrganizerChatEventUseCase } from "../../../application/interface/useCases/organizer/chat/IGetOrganizerChatEventUseCase";
import { IGetUserChatEventUseCase } from "../../../application/interface/useCases/organizer/chat/IGetUserEventChatUseCase";


export class ChatController {
  constructor(

      private _startPrivateChatUseCase : IStartPrivateChatUseCase,
      private _getCommunityChatUseCase : IGetCommunityChatUseCase,
      private _getMessagesUseCase : IGetMessagesUseCase,
      private _sendMessagesUseCase : ISendMessageUseCase,
      private _getEventChatUseCase: IGetOrganizerChatEventUseCase,
      private _getEventChatForUserUseCase : IGetUserChatEventUseCase

  ){}

   // PRIVATE CHAT (User<> Organizer) //
 async startPrivateChat(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
    try{
          const{ userId, organizerId, eventId } = req.body;
          console.log("eeee", req.body)
          const result = await this._startPrivateChatUseCase.execute( userId,organizerId, eventId);

        
     
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CHAT.CHAT_SUCCESS, HttpStatusCode.OK, result));

    }catch(err){
       if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
       next(err)
    }
 }
  // COMMUNITY CHAT//
 async getCommunityChat(req: IAuthenticatedRequest, res: Response, next :NextFunction): Promise<void> {
    try{
         const {eventId} = req.params;
          if(!eventId) throw new CustomError("EventId is required", HttpStatusCode.BAD_REQUEST);
        
         const result = await this._getCommunityChatUseCase.execute(eventId);
      res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CHAT.COMMUNITY_FETCH_SUCCESS, HttpStatusCode.OK, result));

    }catch(err){
        if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
       next(err)
    }
 }
  //  GET ALL MESSAGES OF A CONVERSATION //
 async getMessages(req: IAuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
     try{
           const{ conversationId }  = req.params;
           if(!conversationId) throw new CustomError("conversationId is required", HttpStatusCode.BAD_REQUEST);
         
         const messages = await this._getMessagesUseCase.execute(conversationId);
        
       res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CHAT.MESSAGES_FETCH_SUCCESS, HttpStatusCode.OK, messages));
      
     }catch(err){
       if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
       next(err)
     }
 }
 
  // SEND MESSAGES (Private or Community chat) //
 async sendMessage(req: IAuthenticatedRequest, res: Response, next :NextFunction) : Promise<void> {
    try{
          const dto: SendMessageRequestDTO = req.body;
        const result = await this._sendMessagesUseCase.execute(dto);

    res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.CHAT.MESSAGE_SAVE_SUCCESS, HttpStatusCode.CREATED, result));

    }catch(err){
         if(err instanceof NotFoundError) throw new CustomError(err.message, HttpStatusCode.NOT_FOUND);
       next(err)
    }
 }
 async getOrganizerEventChats(req: IAuthenticatedRequest, res: Response, next: NextFunction)  {
     try{
         const organizerId = req.user!.id;
         const { eventId }  = req.params;
         


         if(!organizerId || !eventId) throw new CustomError("UserId and OrganizerId are required", HttpStatusCode.BAD_REQUEST);
       
       const chats =  await this._getEventChatUseCase.execute(organizerId, eventId);
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CHAT.CHAT_SUCCESS, HttpStatusCode.OK, chats));

     }catch(err){
        next(err)
     }
 }
 async getUserEventChats(req: IAuthenticatedRequest, res: Response, next: NextFunction)  {
     try{
         const userId = req.user!.id;
         const { eventId }  = req.params;
         
         if(!userId || !eventId) throw new CustomError("UserId and eventId are required", HttpStatusCode.BAD_REQUEST);
       
       const chats =  await this._getEventChatForUserUseCase.execute(userId, eventId);
    res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CHAT.CHAT_SUCCESS, HttpStatusCode.OK, chats));

     }catch(err){
        next(err)
     }
 }
}