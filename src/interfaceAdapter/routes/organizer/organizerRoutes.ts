import express, { NextFunction, Request, Response } from 'express';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { authenticationMiddleWare } from '../../../di/container';
import {
  documentController,
  documentVerificationRequestController,
  organizerAccountSecurityController,
  organizerProfileController,
} from '../../../di/organizer/container';
import { ZodPasswordValidator } from '../../../infrastructure/middleware/zodValidator';
import { passwordSchema } from '../../../infrastructure/validation/schemas/changePasswordSchema';
import {
  checkBlockedMiddleware,
  cloudinaryController,
  passwordController,
} from '../../../di/common/commonContainers';
import {
  eventManagementController,
  eventRetrievalController,
} from '../../../di/organizer/events/container';
import {
  ticketingManagementController,
  ticketingRetrievalController,
} from '../../../di/organizer/ticketing/container';
import { bookingsDisplayController } from '../../../di/organizer/bookings/container';
import { organizerVerificationMiddleware } from '../../../di/organizer/verification-middleware/container';
import { InputDataValidator } from '../../../infrastructure/middleware/zodMiddleware/inputDataValidator';
import {
  organizerEventSchema,
  organizerEventUpdateSchema,
} from '../../../infrastructure/validation/schemas/organizer/organizerEventSchema';
import {
  organizerTicketSchema,
  organizerTicketUpdateSchema,
} from '../../../infrastructure/validation/schemas/organizer/organizerTicketSchema';
import {
  organizerSubscriptionRetrievalController,
  subscriptionPaymentController,
} from '../../../di/organizer/subscription/container';
import {
  stripeConnectController,
  stripeOnboardingStatusController,
} from '../../../di/organizer/stripe-onboarding/container';
import { chatController } from '../../../di/common/chat/container';
import { organizerDashboardController } from '../../../di/organizer/dashboard/container';
import { bookingQuerySchema } from '../../../infrastructure/validation/schemas/organizer/bookingQuerySchema';
import { OrganizerDashboardQuerySchema } from '../../../infrastructure/validation/schemas/organizer/organizerDashboardQuerySchema';
import { EventAnalyticsQuerySchema } from '../../../infrastructure/validation/schemas/common/eventAnalyticsQuerySchema';
import { eventAnalyticsController } from '../../../di/common/event-analytics/container';
// import { OrganizerAccountSecurityController } from "../../controllers/organizer/organizerAccountSecurityController";

const router = express.Router();

router.post(
  '/forgetPassword',
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    passwordController.requestForgetPassword(req, res, next)
);

router.post(
  '/resetPasswordOtp',
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    passwordController.verifyResetPasswordOtp(req, res, next)
);
router.post(
  '/changePassword',
  authenticationMiddleWare.authenticateChangePassword.bind(
    authenticationMiddleWare
  ),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    passwordController.changePassword(req, res, next)
);

router.patch(
  '/organizerProfile/:id',
  (req: Request, res: Response, next: NextFunction) =>
    organizerProfileController.updateOrganizerProfile(req, res, next)
);
router.get(
  '/organizerProfile/:id',
  (req: Request, res: Response, next: NextFunction) =>
    organizerProfileController.fetchOrganizerProfile(req, res, next)
);
router.patch(
  '/updatePassword/:organizerId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  ZodPasswordValidator.validate(passwordSchema),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    organizerAccountSecurityController.updatePassword(req, res, next)
);

// ORGANIZER DOCUMENT VERIFICATION //

router.get(
  '/uploaded-documents/signed-url',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    cloudinaryController.getSignedDocumentUrl(req, res, next)
);
router.post(
  '/upload-document',
  (req: Request, res: Response, next: NextFunction) =>
    documentController.saveDocument(req, res, next)
);
router.get(
  '/uploaded-documents/:organizerId',
  (req: Request, res: Response, next: NextFunction) =>
    documentController.getDocuments(req, res, next)
);
router.delete(
  '/uploaded-document/:documentId/deletion',
  (req: Request, res: Response, next: NextFunction) =>
    documentController.deleteDocument(req, res, next)
);
router.patch(
  '/uploaded-documents/:documentId',
  (req: Request, res: Response, next: NextFunction) =>
    documentController.updateDocument(req, res, next)
);

router.get(
  '/cloudinary/:organizerId/signature',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    cloudinaryController.getKycUploadSignature(req, res, next)
);
router.patch(
  '/:organizerId/verification-request',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    documentVerificationRequestController.completeVerificationRequest(
      req,
      res,
      next
    )
);
router.get(
  '/cloudinary/signature',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    cloudinaryController.getSignature(req, res, next)
);

// Events Related //

router.get(
  '/events/:eventId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventRetrievalController.getEventById(req, res, next)
);
router.get(
  '/:organizerId/events',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventRetrievalController.getEventsByOrganizer(req, res, next)
);
router.get(
  '/events',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventRetrievalController.getAllEvents(req, res, next)
);
router.post(
  '/events',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  InputDataValidator.validate(organizerEventSchema),
  organizerVerificationMiddleware.verify,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventManagementController.createEvent(req, res, next)
);
router.patch(
  '/events/:eventId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  organizerVerificationMiddleware.verify,
  InputDataValidator.validate(organizerEventUpdateSchema),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventManagementController.editEvent(req, res, next)
);

// for soft delete of events //
router.delete(
  '/events/:eventId/soft-delete',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  organizerVerificationMiddleware.verify,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventManagementController.Delete(req, res, next)
);
router.patch(
  '/events/:eventId/cancel',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  organizerVerificationMiddleware.verify,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventManagementController.cancel(req, res, next)
);

// EventTicketing //
router.get(
  '/ticketing/:ticketId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    ticketingRetrievalController.fetchTicketingDetails(req, res, next)
);
router.get(
  '/events/:eventId/ticketing',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    ticketingRetrievalController.fetchTicketingDetailsByEvent(req, res, next)
);
router.post(
  '/ticketing',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  InputDataValidator.validate(organizerTicketSchema),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    ticketingManagementController.create(req, res, next)
);
router.patch(
  '/events/:eventId/ticketing',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  InputDataValidator.validate(organizerTicketUpdateSchema),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    ticketingManagementController.update(req, res, next)
);

//booking- display//
router.get(
  '/:organizerId/bookings',
  InputDataValidator.validateQuery(bookingQuerySchema),
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: Request, res: Response, next: NextFunction) =>
    bookingsDisplayController.fetchAllBookings(req, res, next)
);
router.get(
  '/bookings/:eventId',
  InputDataValidator.validateQuery(bookingQuerySchema),
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    bookingsDisplayController.fetchBookingsByEventId(req, res, next)
);
router.get(
  '/:organizerId/bookings/:bookingId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    bookingsDisplayController.fetchBookingDetailsById(req, res, next)
);

// subscription -purchase //
router.get(
  '/:organizerId/subscription',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    organizerSubscriptionRetrievalController.fetchSubscription(req, res, next)
);
router.get(
  '/subscription-plans',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    organizerSubscriptionRetrievalController.fetchAllSubscriptionPlans(
      req,
      res,
      next
    )
);
router.post(
  '/subscription/checkout',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    subscriptionPaymentController.createCheckout(req, res, next)
);

// stripe-onboarding//
router.post(
  '/stripe/onboard',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  organizerVerificationMiddleware.verify,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    stripeConnectController.onBoard(req, res, next)
);
router.post(
  '/stripe/verify',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  organizerVerificationMiddleware.verify,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    stripeOnboardingStatusController.verify(req, res, next)
);
router.get("/stripe-accounts/:organizerId",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),checkBlockedMiddleware.execute,organizerVerificationMiddleware.verify,(req : IAuthenticatedRequest, res :Response, next: NextFunction) => stripeConnectController.getAccounts(req, res, next));
// chat//
router.get(
  '/chat/event/:eventId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    chatController.getOrganizerEventChats(req, res, next)
);

// dashboard //

router.get(
  '/dashboard',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    organizerDashboardController.getDashboard(req, res, next)
);
router.get(
  '/dashboard-details',
  InputDataValidator.validateQuery(OrganizerDashboardQuerySchema),
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    organizerDashboardController.getDashboardDetails(req, res, next)
);
router.get(
  '/event-analytics',
  InputDataValidator.validateQuery(EventAnalyticsQuerySchema),
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  checkBlockedMiddleware.execute,
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    eventAnalyticsController.getEventAnalytics(req, res, next)
);

export default router;
