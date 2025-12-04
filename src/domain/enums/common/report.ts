export enum ReportTypes {
  EVENT ="event",
  USER = "user",
  ORGANIZER = "organizer",
   CHAT_MESSAGE = "chat_message",
}

export enum ReportStatus {
    PENDING ="pending",
    REVIEWED = "reviewed",
    ACTION_TAKEN = "action-taken",
    IGNORED = "ignored"
}
export enum ReportActions {
  BLOCK ="block",
  WARN ="warn",
  NOT_NEEDED ="not needed"
}
export enum ConversationType {
  PRIVATE= "private",
  COMMUNITY ="community"
}

