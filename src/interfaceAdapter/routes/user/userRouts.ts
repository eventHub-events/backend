import { authController, passwordController, userProfileController } from '../../../di/container';
import express, { NextFunction, Request, Response } from 'express';
import { authenticationMiddleWare } from '../../../di/container';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import {  googleAuthController, tokenController } from '../../../di/common/commonContainers';
import { InputDataValidator } from '../../../infrastructure/middleware/zodMiddleware/inputDataValidator';
import {  userProfileUpdateSchema} from '../../../infrastructure/validation/schemas/user/userProfileSchema';
import { eventDisplayController } from '../../../di/user/event-display/container';
import { EventDisplayRoutes } from '../../../infrastructure/constants/api-routes/user/event-display/constants';
import { eventBookingController, getUserBookingsController } from '../../../di/user/booking/container';
import { userRegisterSchema } from '../../../infrastructure/validation/schemas/user/userRegistrationSchema';
import { userForgetPassWordSchema } from '../../../infrastructure/validation/schemas/changePasswordSchema';
import { bookingPaymentController } from '../../../di/user/payment/container';
import { chatController } from '../../../di/common/chat/container';
import { reportController } from '../../../di/common/report/container';
import { EventSearchQuerySchema } from '../../../infrastructure/validation/schemas/user/EventSearchQuerySchema';
import { bookingQuerySchema } from '../../../infrastructure/validation/schemas/organizer/bookingQuerySchema';
const router = express.Router();

// router.post('/register', (req, res) => authController.registerUser(req, res));
router.post("/register",InputDataValidator.validate(userRegisterSchema),(req: Request, res: Response, next: NextFunction) =>authController.registerUser(req, res, next))
router.post('/verify-otp', (req: Request, res: Response, next: NextFunction) => authController.verifyOtp(req, res, next));
router.post('/resend-otp', (req: Request, res: Response, next: NextFunction) => authController.resendOtp(req, res, next));
router.post("/login",(req: Request, res: Response, next: NextFunction)=>authController.loginUser(req,res,next))
router.post ("/logout",(req: Request, res: Response, next: NextFunction)=>authController.logout(req,res, next));
 router.post("/refreshToken",(req: IAuthenticatedRequest, res: Response, next: NextFunction) => tokenController.refreshAccessToken(req,res,next))

router.post("/forgetPassword" ,(req:IAuthenticatedRequest,res:Response,next:NextFunction)=>passwordController.requestForgetPassword(req,res,next))


router.post('/resetPasswordOtp',(req:IAuthenticatedRequest,res,next:NextFunction)=>passwordController.verifyResetPasswordOtp(req,res,next))

router.post("/changePassword",authenticationMiddleWare.authenticateChangePassword.bind(authenticationMiddleWare), InputDataValidator.validate(userForgetPassWordSchema), (req:IAuthenticatedRequest,res: Response,next:NextFunction)=>passwordController.changePassword(req,res,next));

// user profile related
router.get("/:userId/profile",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => userProfileController.fetchUserProfile(req,res,next ));
router.patch("/:profileId/profile",InputDataValidator.validate(userProfileUpdateSchema),(req: IAuthenticatedRequest, res: Response, next: NextFunction ) => userProfileController.updateUserProfile(req,res,next));

// events-display-related //
router.get(EventDisplayRoutes.EVENTS.TRENDING,(req: Request, res: Response, next: NextFunction) => eventDisplayController.getTrending(req, res, next));
router.get(EventDisplayRoutes.EVENTS.FEATURED,(req: Request,res: Response, next: NextFunction) => eventDisplayController.getFeatured(req, res, next));
  router.get(EventDisplayRoutes.EVENTS.DETAILS,(req: Request, res: Response, next: NextFunction) => eventDisplayController.getEventDetailsById(req, res, next));
router.get("/events/featured/all",InputDataValidator.validateQuery(EventSearchQuerySchema),(req: Request, res: Response, next :NextFunction) => eventDisplayController.getAllFeatured(req, res, next));
router.get("/search/events",InputDataValidator.validateQuery(EventSearchQuerySchema),(req: Request, res: Response, next: NextFunction)  => eventDisplayController.getEventsForGeneralSearch(req, res, next));

// event-booking//

router.post("/events/:eventId/book",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => eventBookingController.bookTickets(req, res, next));
router.get("/bookings/session/:sessionId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare), (req: Request, res: Response, next: NextFunction) => getUserBookingsController.getBookingBySessionId(req, res, next));
router.get("/:userId/bookings", InputDataValidator.validateQuery(bookingQuerySchema),authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: Request, res: Response, next: NextFunction) => getUserBookingsController.getUserBookings(req, res, next));
router.get("/bookings/:bookingId", (req: Request, res: Response, next: NextFunction) => getUserBookingsController.getBookingById(req, res, next));
router.patch("/bookings/cancel/:bookingId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => eventBookingController.cancelPaidBooking(req, res, next));


//google-login
router.post("/google-login",(req: Request, res: Response, next: NextFunction) => googleAuthController.googleLogin(req, res, next));

// ticket-payment//
router.post("/payments/create-checkout-session",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: Request, res: Response, next: NextFunction) => bookingPaymentController.createSession(req, res, next));

// chat //
router.get("/chat/event/:eventId", authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => chatController.getUserEventChats(req, res, next));

// reporting //
router.post("/report/event",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reportController.createEventReport(req, res, next));
router.post("/report/organizer",authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),(req: IAuthenticatedRequest, res: Response, next: NextFunction) => reportController.createOrganizerReport(req, res, next));

export default router