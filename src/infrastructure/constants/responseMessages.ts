export const ResponseMessages = {
  EVENT: {
    TRENDING_FETCH_SUCCESS: 'Trending events fetched successfully',
    TRENDING_FETCH_FAILED: 'Failed to fetch trending events',
    FEATURED_FETCH_SUCCESS: 'Featured events fetched successfully',
    EVENTS_FETCH_SUCCESS: 'Events fetched successfully',
    FEATURED_FETCH_FAILED: 'Failed to fetch featured events',
    EVENT_DETAILS_FETCH_SUCCESS: 'Event  details fetched successfully',
    EVENT_DETAILS_FETCH_FAILURE: 'Event details failed to fetch',
    EVENT_CREATION_SUCCESS: 'Event created successfully',
    EVENT_UPDATE_SUCCESS: 'Event updated successfully',
    EVENT_DELETE_SUCCESS: 'Event deleted successfully',
    EVENT_CANCEL_SUCCESS: 'Event cancelled successfully',
  },
  EVENT_MODERATION: {
    EVENT_MODERATION_UPDATE_SUCCESS: 'Moderation details Updated successfully',
    EVENT_MODERATION_CREATION_SUCCESS:
      'Moderation details created successfully',
    EVENT_MODERATION_FETCH_SUCCESS: 'Event moderation  fetch  success',
  },
  TRANSACTION_PDF_REPORT: {
    SET_HEADER_ONE: 'content-Disposition',
    ATTACHMENT: `attachment; filename="transactions_${Date.now()}.pdf`,
    CONTENT_TYPE: 'Content-Type',
    APPLICATION_PDF: 'application/pdf',
  },
  EVENT_ANALYTICS: {
    DETAILS_FETCH_SUCCESS: 'Details fetched successfully',
  },
  STRIPE_ACCOUNTS: {
    FETCH_SUCCESS: 'Stripe accounts fetched successfully',
  },
  CLOUDINARY: {
    CLOUDINARY_SIGNATURE_CREATION_SUCCESS: 'Signature created successfully',
    CLOUDINARY_DOWNLOAD_URL_SUCCESS: 'Signed url  created successfully',
  },

  BOOKING: {
    BOOKING_SUCCESS: 'Tickets booked successfully',
    BOOKING_FAILURE: 'Tickets not available',
    PAYMENT_SESSION: 'Payment session created',
    BOOKING_CANCEL_SUCCESS: 'Booking cancelled successfully',
  },
  BOOKING_DETAILS: {
    BOOKING_DETAILS_SUCCESS: 'Booking details fetched successfully',
    BOOKING_DETAILS_FAILURE: 'Booking details not found',
  },
  GENERAL: {
    INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later.',
  },
  AUTHENTICATION: {
    OTP: {
      OTP_SENT_SUCCESS: 'Otp  sent successfully',
      OTP_SENT_FAIL: 'Failed to sent OTP',
      OTP_VERIFICATION_SUCCESS: 'OTP verified SuccessFully',
      OTP_VERIFICATION_FAILURE: 'OTP verification failed',
      OTP_RESENT_SUCCESS: 'Otp  resent successfully',
    },
    PASSWORD: {
      PASSWORD_RESET_INITIALIZATION: 'Password reset initiated',
      PASSWORD_CHANGE_SUCCESS: 'Password change success',
    },
    EMAIL: {
      REQUIRED: 'Email is required',
    },
    LOGIN: {
      SUCCESS: 'Login Successful',
      FAILURE: 'login  failed',
    },
    TOKEN: {
      ACCESS_TOKEN_CREATION_SUCCESS: 'Access token creation successful',
    },
    LOGOUT: {
      LOGOUT_SUCCESS: 'logout successful',
    },
  },
  CHAT: {
    CHAT_SUCCESS: 'Chat fetched or created successfully',
    COMMUNITY_FETCH_SUCCESS: 'CommunityChat  fetched successfully',
    MESSAGES_FETCH_SUCCESS: 'Messages fetched successfully',
    MESSAGE_SAVE_SUCCESS: 'Messages saved successfully',
  },
  REVIEW: {
    REVIEW_CREATION_SUCCESS: 'Review creation successful ',
    REVIEW_UPDATE_SUCCESS: 'Review update successful',
    REVIEW_DELETION_SUCCESS: 'Review deleted successfully',
    REVIEWS_FETCH_SUCCESS: 'Reviews fetched successfully',
    REVIEW_SUMMARY_SUCCESS: 'Review summary fetched  successfully',
  },
  REPORT: {
    REPORT_SUCCESS: 'Report submitted successfully',
    REPORTS_FETCH_SUCCESS: 'Reports fetched successfully',
    REPORT_UPDATE_SUCCESS: 'Report updated successfully',
  },
  ADMIN_DASHBOARD: {
    ON_SUCCESS: 'Admin  dashboard details fetched successfully',
  },
  WEBHOOK: {
    RECEIVED: 'webhook received',
  },
  USER: {
    PROFILE: {
      FETCH_SUCCESS: 'User profile fetched successfully',
      UPDATE_SUCCESS: 'User Profile Updated successfully',
      USER_PROFILE_CREATE_SUCCESS: 'UserProfileCreatedSuccessfully',
    },
    USER_LIST: {
      USER_LIST_FETCH_SUCCESS: 'UserList fetched successfully',
      USER_DATA_UPDATE_SUCCESS: 'User data updated successfully',
    },
  },
  ORGANIZER_DASHBOARD: {
    ON_SUCCESS: 'Organizer dashboard details fetched successfully',
  },
  UPLOAD_DOCUMENT: {
    FETCH_SUCCESS: 'Upload documents fetched successfully',
    FETCH_FAILURE: 'Upload documents not found',
    DOCUMENT_SAVE: 'Document saved successfully',
    DOCUMENT_DELETE_SUCCESS: 'Document  deleted successfully',
    DOCUMENT_UPDATE_SUCCESS: 'Document updated successfully',
    DOCUMENT_VERIFICATION_REQUEST_SUCCESS:
      'Verification request sent  successfully',
    DOWNLOAD_SUCCESS: 'Document downloaded successfully',
  },
  FINANCE_PAYOUT: {
    FETCH_SUCCESS: 'Finance overview details fetched successfully',
    FETCH_TRANSACTIONS_SUCCESS: 'Fetch transactions successfully',
    FETCH_REFUND_SUCCESS: 'Fetch refunds successfully',
    FETCH_REFUND_OVERVIEW_SUCCESS:
      'Fetch refunds overview details successfully',
    FETCH_PAYOUTS_SUCCESS: 'Fetch payouts overview details successfully',
    FETCH_PAYOUTS_OVERVIEW_SUCCESS:
      'Fetch payouts overview details successfully',
    FETCH_EVENT_REVENUE_SUMMARY_SUCCESS:
      'Fetch event revenue summary successfully',
    FETCH_SUBSCRIPTION_PLAN_REVENUE_SUCCESS:
      'Fetch  subscriptionPlan revenue details successfully',
    FETCH_SUBSCRIPTION_PLAN_OVERVIEW_DETAILS_SUCCESSFULLY:
      'Fetch subscription overview details successfully',
  },
  PROFILE: {
    PASSWORD_UPDATE_SUCCESS: 'Password updated successfully',
    PROFILE_CREATION_SUCCESS: 'Profile data creation successfully',
    PROFILE_DATA_FETCH_SUCCESS: 'Profile data fetched successfully',
  },
  STRIP_CONNECT: {
    ON_BOARDING_URL_SUCCESS: 'Onboarding url created successfully',
    ON_BOARDING_STATUS_VERIFICATION_SUCCESS:
      'Onboarding Status verified successfully',
  },
  ORGANIZER_SUBSCRIPTION: {
    CHECKOUT_CREATION_URL_SUCCESS: 'checkOutUrl created successfully',
  },
  TICKETING: {
    TICKETING_CREATION_SUCCESS: 'Ticketing details created successfully',
    TICKETING_UPDATE_SUCCESS: 'Ticketing details updated SuccessFully',
    TICKETING_FETCH_SUCCESS: 'Ticketing details fetched successfully',
  },
  CATEGORY: {
    CATEGORY_CREATION_SUCCESS: 'Category  created successfully',
    CATEGORY_EDIT_SUCCESS: 'Category edited successfully',
    CATEGORIES_FETCH_SUCCESS: 'Categories fetched successfully',
    CATEGORY_FETCH_SUCCESS: 'Categories fetched successfully',
    CATEGORY_DELETE_SUCCESS: 'Category deleted successfully ',
  },
  ORGANIZER_VERIFICATION: {
    ORGANIZER_VERIFICATION_DETAILS_FETCH_SUCCESS:
      'Organizer Verification  details fetched successfully',
    PENDING_ORGANIZERS_FETCH_SUCCESS: 'Pending organizers fetched successfully',
    PENDING_ORGANIZERS_WITH_PROFILE_FETCH_SUCCESS:
      'Pending organizers with profile fetched successfully',
    ORGANIZER_OVERALL_VERIFICATION_STATUS_UPDATE_SUCCESS:
      'Organizer overall verification status updated successfully',
  },
};
