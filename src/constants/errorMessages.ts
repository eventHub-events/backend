export const ErrorMessages = {
  ORGANIZER: {
    ID_REQUIRED: 'Organizer id is required',
    NOT_FOUND: 'Organizer not found',
    BLOCKED: 'Organizer is blocked',
    PENDING_ORGANIZER_NOT_EXIST: "Pending organizers doesn't exist",
    OVER_ALL_STATUS_UPDATE_SUCCESS: 'Over all status updated successfully',
    PROFILE_CREATION_FAILED: 'Organizer Profile creation failed',
  },
  CLOUDINARY: {
    GENERATE_SIGNATURE_ERROR: 'Cloudinary signature creation failed',
    FOLDER_REQUIRED_ERROR: 'Folder  name is required',
    CLOUDINARY_PUBLIC_ID_REQUIRED: 'Cloudinary publicId is required',
    SIGNED_URL_CREATION_FAILED: 'Signed url  creation  failed',
  },
  EVENT: {
    ID_REQUIRED: 'Event id is required',
    NOT_FOUND: 'Event not found',
    SOLD_OUT: 'Event is sold out',
    EVENT_DETAILS_REQUIRED: 'Event details is required',
    UPDATE_FAILED: 'Event update failed',
    CREATION_FAILED: 'Event details not saved',
    EVENT_ALREADY_CANCELLED: 'Event already  cancelled',
    FEATURED_EVENT_NOT_FOUND: 'featured events Not found',
    UPCOMING_EVENT_NOT_FOUND: 'Upcoming event details not found',
  },
  ERROR_CODES: {
    USER_BLOCKED: 'USER_BLOCKED',
  },
  EVENT_ANALYTICS: {
    DETAILS_NOT_FOUND: 'Event analytics details not found',
  },
  SUBSCRIPTION_PLAN: {
    PLAN_NOT_FOUND: 'Subscription plan not found',
    STATUS_UPDATE_SUCCESS: 'Subscription status updated successfully',
  },
  EVENT_MODERATION: {
    ID_REQUIRED: 'EventModeration id is required',
    EVENT_MODERATION_DETAILS_REQUIRED: 'Event moderation details required',
    EVENT_MODERATION_UPDATE_DETAILS_REQUIRED:
      'Event moderation update details required',
    EVENT_MODERATION_DETAILS_NOT_FOUND: 'Event Moderation details not found',
  },
  REFUND: {
    PAID_REQUEST_ERROR: 'Only paid bookings can be cancelled',
    CANCEL_WINDOW_CLOSED: 'Cancellation window closed',
  },
  STRIPE_ACCOUNT: {
    ACCOUNT_ID_REQUIRED: 'Stripe account id is required',
    NOT_FOUND_ERROR: 'Stripe account not found',
  },
  AUTH: {
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_TOKEN: 'Invalid or expired token',
    LOGIN_REQUIRED: 'Login required',
    EMAIL_AND_PASSWORD_REQUIRED: 'Email and  password are required',
    TOKEN_VERIFICATION_FAILURE: 'Token verification failed',
    PASSWORD_INVALID: 'Invalid password',
    OTP_REQUIRED: 'OTP is required',
    OTP_EXPIRED_OR_INVALID: 'OTP expired or invalid',
    BLOCK_ERROR: 'Your account has been blocked. Contact support.',
    PASSWORD_ERROR : "Password already exists",
    OTP_GENERATION_ERROR : "Otp generation  failed",
    TOKEN_NOT_FOUND : "Token not found"
  },
  COMMON: {
    INVALID_INPUT: 'Invalid input provided',
    FORBIDDEN: 'You do not have permission',
    EVENT_AND_ORGANIZER_ID_REQUIRED: 'OrganizerId and eventId are required',
    USERID_AND_EVENTID: 'UserId and organizerId are required',
    ORGANIZER_ID_UPDATE_DETAILS_REQUIRED:
      'organizerId and update details are required',
  },
  UPLOAD_DOCUMENT: {
    ID_REQUIRED: 'Document id is required',
    INVALID_URL: 'Missing or inValid imageUrl',
    FAILED_TO_SAVE: 'Failed to  save upload document',
    DOCUMENT_NOT_FOUND: 'Document not found or could not be deleted',
    UPDATE_FAILURE: 'Document  update failed',
  },
  TOKEN : {
   CREATION_FAILED_ERROR : "Token Creation failed"
  },
  PROFILE: {
    DETAILS_EMPTY: 'Update profile details are empty',
    UPDATE_FAILURE: 'Failed to update profile',
    PROFILE_FETCH_FAILURE: 'Error in  fetching profile data',
  },
  TICKETING: {
    ID_REQUIRED: 'Ticketing id is required',
    DETAILS_NOT_FOUND: 'Ticketing Details not found',
    CREATION_FAILED: 'Ticketing details creation  failed',
    UPDATE_FAILED: 'Ticketing details update  failed',
  },
  CONVERSATION: {
    ID_REQUIRED: 'Conversation id is required',
  },
  GOOGLE_LOGIN: {
    TOKEN_INVALID: 'Invalid Google token',
    NAME_AND_EMAIL_REQUIRED: 'name and email is required',
  },
  REVIEW: {
    ID_REQUIRED: 'Review id is required',
    TARGET_ID_REQUIRED: 'TargetId is required',
    NOT_FOUND: 'Review Not found',
    REVIEWS_NOT_FOUND: 'Reviews Not found',
    UPDATE_FAILED: 'Review Update failed',
    ALREADY_REVIEWED_ERROR: 'You already reviewed this event',
    BOOK_EVENT_ERROR: 'You must book the ticket before reviewing the event',
    REVIEW_CREATION_FAILED: 'Review creation failed',
    ORGANIZER_REVIEW_ERROR:
      'You must have booked an event from this organizer to review them.',
    ALREADY_REVIEWED_ORGANIZER_ERROR: 'You already authorized this organizer',
  },
  USER: {
    ID_REQUIRED: 'User id is required',
    NOT_FOUND: 'User not found',
    USER_BLOCK_ADMIN: 'You are blocked by  admin',
    USER_ALREADY_EXITS: 'User already exists',
    USER_UPDATE_FAILURE: 'User update failed',
  },
  EMAIL: {
    CREDENTIALS_MISSING: 'Email credentials are missing  from  env',
  },

  BOOKING: {
    ID_REQUIRED: 'Booking id is required',
    SESSION_ID_REQUIRED: '  Session id is required',
    BOOKINGS_NOT_FOUND: 'Bookings not found',
    BOOKING_NOT_FOUND: 'Booking not found',
    BOOKING_SEAT_NOT_AVAILABLE: 'Booking failed - seats not available',
    USER_BOOKING_LIST_NOT_FOUND: 'User Booking List not Found',
    BOOKING_ALREADY_PROCESSED: 'Booking already processed',
    NO_DUE_BOOKINGS_FOUND: 'No due bookings found',
  },
  CATEGORY: {
    ID_REQUIRED: 'CategoryId is required',
    NOT_FOUND: 'Category not found',
  },
  SUBSCRIPTION: {
    ID_REQUIRED: 'Subscription id is required',
    STATUS_REQUIRED: 'Status is required',
    PLAN_ID_REQUIRED: 'Plan id is required',
    SUBSCRIPTION_DETAILS: 'Subscription details is required',
    SUBSCRIPTION_NOT_FOUND: 'Subscription details not found',
  },
  CHAT: {
    NOT_ELIGIBLE_TO_REPORT_ORGANIZER:
      'You are not eligible to report this organizer',
    CHAT_MESSAGE_NOT_FOUND: 'Chat message not found',
    REPORT_OWN_MESSAGE_ERROR: 'You cannot report your own message',
    CONVERSATION_NOT_FOUND: 'Conversation not found',
    CONVERSATION_NOT_FOUND_FOR_UPDATE: 'Conversation not found for update',
    USERID_NOT_FOUND_IN_CHAT: 'You are not part of  this conversation',
    MESSAGE_NOT_SAVED: 'Message not saved',
    PRIVATE_CHATS_NOT_FOUND: 'Private chats not found',
    PRIVATE_CONVERSATION_NOT_FOUND: 'Private conversations not found',
  },
  REPORT: {
    NOT_FOUND: 'Report not found',
    TARGET_PERSON_NOT_FOUND: 'Target person not found',
    NOT_ELIGIBLE_TO_REPORT: 'You are not eligible to report this event',
  },
  STRIPE: {
    ON_BOARDING: {
      AL_READY_COMPLETED: 'stripe Onboarding already completed',
      ON_ONBOARDING_FAILED: 'Stripe onBoarding failed',
      VERIFICATION_FAILED: 'Verification failed',
    },
    ACCOUNT_NOT_FOUND: 'Stripe account not found',
  },
  Transactions: {
    NOT_FOUND: 'Transactions not found',
  },

  TRANSACTIONS_QUERY_SCHEMA: {
    FROM_DATE_ERROR: ' Invalid from-date',
    TO_DATE_ERROR: ' Invalid to-date',
  },
} as const;
