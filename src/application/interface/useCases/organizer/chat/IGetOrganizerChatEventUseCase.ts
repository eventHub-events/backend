export interface IGetOrganizerChatEventUseCase {
  execute(organizerId: string, eventId: string): Promise<any>;
}