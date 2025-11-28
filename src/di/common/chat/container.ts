import { ConversationMapper } from "../../../application/mapper/common/chat/ConversationMapper";
import { MessageMapper } from "../../../application/mapper/common/chat/MessageMapper";
import { GetCommunityChatUseCase } from "../../../application/useCases/common/chat/GetCommunityChatUseCase";
import { GetMessagesUseCase } from "../../../application/useCases/common/chat/GetMessagesUseCase";
import { MarkMessagesAsReadUseCase } from "../../../application/useCases/common/chat/MarkMessageAsReadUseCase";
import { SendMessageUseCase } from "../../../application/useCases/common/chat/SendMessageUseCase";
import { StartPrivateChatUseCase } from "../../../application/useCases/common/chat/StartPrivateChatUseCase";
import { GetOrganizerChatEventUseCase } from "../../../application/useCases/organizer/chat/getOrganizerChatEventUseCase";
import { GetUserChatEventUseCase } from "../../../application/useCases/user/chat/GetUserChatEventUseCase";
import { ConversationEntityFactory } from "../../../infrastructure/factories/common/ConversationEntityFactory";
import { MessageEntityFactory } from "../../../infrastructure/factories/common/MessageEntityFactory";
import { ConversationRePository } from "../../../infrastructure/repositories/common/ConversationRepository";
import { MessageRepository } from "../../../infrastructure/repositories/common/MessageRepository";
import { ChatController } from "../../../interfaceAdapter/controllers/common/ChatController";
import { userRepository } from "../commonContainers";

const messageEntityFactory = new MessageEntityFactory();
const messageRepository =  new MessageRepository(messageEntityFactory);
const messageMapper = new MessageMapper();

const conversationEntityFactory  = new ConversationEntityFactory();
const conversationRepository  = new ConversationRePository(conversationEntityFactory);
const conversationMapper = new ConversationMapper();

const getCommunityChatUseCase = new GetCommunityChatUseCase(conversationRepository, conversationMapper);
const getMessagesUseCase   = new GetMessagesUseCase(messageRepository,messageMapper );
const startPrivateChatUseCase = new StartPrivateChatUseCase(conversationRepository, conversationMapper, userRepository);
export const sendMessagesUseCase = new SendMessageUseCase(messageRepository, conversationRepository, messageMapper);
const getOrganizerChatEventUseCase = new GetOrganizerChatEventUseCase(conversationRepository, conversationMapper, messageRepository);

export const markMessagesAsReadUseCase  = new MarkMessagesAsReadUseCase(messageRepository);
const getUserChatEventUseCase = new GetUserChatEventUseCase(messageRepository, conversationRepository, conversationMapper );

export const chatController  = new ChatController(startPrivateChatUseCase, getCommunityChatUseCase, getMessagesUseCase,sendMessagesUseCase, getOrganizerChatEventUseCase, getUserChatEventUseCase );