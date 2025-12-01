export const ResponseMessages = {
  EVENT: {
    TRENDING_FETCH_SUCCESS : "Trending events fetched successfully",
    TRENDING_FETCH_FAILED: "Failed to fetch trending events",
    FEATURED_FETCH_SUCCESS : "Featured events fetched successfully",
    EVENTS_FETCH_SUCCESS : "Events fetched successfully",
    FEATURED_FETCH_FAILED : "Failed to fetch featured events",
    EVENT_DETAILS_FETCH_SUCCESS: "Event  details fetched successfully",
    EVENT_DETAILS_FETCH_FAILURE : "Event details failed to fetch"
  },
  BOOKING :{
     BOOKING_SUCCESS : "Tickets booked successfully",
     BOOKING_FAILURE : "Tickets not available"
  },
  BOOKING_DETAILS : {
      BOOKING_DETAILS_SUCCESS: "Booking details fetched successfully",
      BOOKING_DETAILS_FAILURE: "Booking details not found"
  },
  GENERAL: {
     INTERNAL_SERVER_ERROR: "Something went wrong, please try again later."
  },
   AUTHENTICATION: {
      OTP : {
         OTP_SENT_SUCCESS: "Otp  sent successfully",
         OTP_SENT_FAIL : "Failed to sent OTP",
         OTP_VERIFICATION_SUCCESS: "OTP verified SuccessFully",
         OTP_VERIFICATION_FAILURE: "OTP verification failed"
      },
      EMAIL : {
         REQUIRED: "Email is required"
      },
      LOGIN: {
         SUCCESS: "Login Successful",
         FAILURE: "login  failed"
      }

   },
   CHAT:{
     CHAT_SUCCESS :"Chat fetched or created successfully",
     COMMUNITY_FETCH_SUCCESS :"CommunityChat  fetched successfully",
     MESSAGES_FETCH_SUCCESS : "Messages fetched successfully",
     MESSAGE_SAVE_SUCCESS : "Messages saved successfully"
   },
   REVIEW:{
      REVIEW_CREATION_SUCCESS : "Review creation successful ",
      REVIEW_UPDATE_SUCCESS : "Review update successful",
      REVIEW_DELETION_SUCCESS : "Review deleted successfully",
      REVIEWS_FETCH_SUCCESS : "Reviews fetched successfully",
      REVIEW_SUMMARY_SUCCESS : "Review summary fetched  successfully"
   },
   REPORT :{
      REPORT_SUCCESS : "Report submitted successfully",
      REPORTS_FETCH_SUCCESS :"Reports fetched successfully",
      REPORT_UPDATE_SUCCESS:"Report updated successfully"

   },
   ADMIN_DASHBOARD: {
      ON_SUCCESS: "Admin  dashboard details fetched successfully"
   },
   WEBHOOK:{
      RECEIVED :"webhook received"
   },
   USER :{
      PROFILE: {
          FETCH_SUCCESS : "User profile fetched successfully",
          UPDATE_SUCCESS : "User Profile Updated successfully"
      }
   },
   ORGANIZER_DASHBOARD : {
      ON_SUCCESS :"Organizer dashboard details fetched successfully"
   }
}