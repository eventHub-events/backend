export const ErrorMessages = {
   ORGANIZER: {
    ID_REQUIRED: "Organizer id is required",
    NOT_FOUND: "Organizer not found",
    BLOCKED: "Organizer is blocked",
  },
   EVENT: {
    ID_REQUIRED: "Event id is required",
    NOT_FOUND: "Event not found",
    SOLD_OUT: "Event is sold out",
    EVENT_DETAILS_REQUIRED :"Event details is required",
    UPDATE_FAILED : "Event update failed",
    CREATION_FAILED : "Event details not saved",
    EVENT_ALREADY_CANCELLED:"Event already  cancelled"
   
  },
  EVENT_MODERATION : {
    ID_REQUIRED: "EventModeration id is required",
    EVENT_MODERATION_DETAILS_REQUIRED : "Event moderation details required",
    EVENT_MODERATION_UPDATE_DETAILS_REQUIRED : "Event moderation update details required"
  },

   AUTH: {
    UNAUTHORIZED: "Unauthorized access",
    INVALID_TOKEN: "Invalid or expired token",
    LOGIN_REQUIRED: "Login required",
    EMAIL_AND_PASSWORD_REQUIRED : "Email and  password are required",
    TOKEN_VERIFICATION_FAILURE : "Token verification failed",
    PASSWORD_INVALID : "Invalid password",
    OTP_REQUIRED: "OTP is required",
    OTP_EXPIRED_OR_INVALID: "OTP expired or invalid"
  },
  COMMON: {
    INVALID_INPUT: "Invalid input provided",
    FORBIDDEN: "You do not have permission",
     EVENT_AND_ORGANIZER_ID_REQUIRED : "OrganizerId and eventId are required",
      USERID_AND_EVENTID : "UserId and organizerId are required",
      ORGANIZER_ID_UPDATE_DETAILS_REQUIRED:"organizerId and update details are required"
  },
  UPLOAD_DOCUMENT : {
     ID_REQUIRED: "Document id is required",
     INVALID_URL : 'Missing or inValid imageUrl'
  },
  PROFILE:{
    DETAILS_EMPTY : "Update profile details are empty",
    UPDATE_FAILURE :"Failed to update profile",
    PROFILE_FETCH_FAILURE : "Error in  fetching profile data"
    
  },
  TICKETING :{
    ID_REQUIRED: "Ticketing id is required",
    DETAILS_NOT_FOUND :"Ticketing Details not found",
    CREATION_FAILED :"Ticketing details creation  failed",
    UPDATE_FAILED:"Ticketing details update  failed"
  },
  CONVERSATION : {
     ID_REQUIRED: "Conversation id is required",
  },
  REVIEW : {
     ID_REQUIRED: "Review id is required",
     TARGET_ID_REQUIRED : "TargetId is required"
  },
  USER:{
     ID_REQUIRED: "User id is required",
     NOT_FOUND :"User not found",
     USER_BLOCK_ADMIN : "You are blocked by  admin",
     USER_ALREADY_EXITS :"User already exists",
     USER_UPDATE_FAILURE: "User update failed"
  },
  EMAIL:{
   CREDENTIALS_MISSING : "Email credentials are missing  from  env"
  },

  BOOKING :{
     ID_REQUIRED: "Booking id is required",
     SESSION_ID_REQUIRED : "  Session id is required",
     BOOKINGS_NOT_FOUND: "Bookings not found"
  },
  CATEGORY : {
       ID_REQUIRED: "CategoryId is required",
  },
  SUBSCRIPTION : {
     ID_REQUIRED: "Subscription id is required",
     STATUS_REQUIRED : "Status is required",
     PLAN_ID_REQUIRED : "Plan id is required",
     SUBSCRIPTION_DETAILS : "Subscription details is required"
  },
  CHAT : {
   NOT_ELIGIBLE_TO_REPORT_ORGANIZER: "You are not eligible to report this organizer",
   CHAT_MESSAGE_NOT_FOUND : "Chat message not found",
   REPORT_OWN_MESSAGE_ERROR :"You cannot report your own message",
   CONVERSATION_NOT_FOUND : "Conversation not found",
   CONVERSATION_NOT_FOUND_FOR_UPDATE: "Conversation not found for update",
   USERID_NOT_FOUND_IN_CHAT : "You are not part of  this conversation"
  },
  REPORT : {
    NOT_FOUND: "Report not found",
    TARGET_PERSON_NOT_FOUND: "Target person not found"
  }

  
  
} as const;