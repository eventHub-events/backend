import { AdminDashboardUseCase } from '../../../application/useCases/admin/dashboard/AdminDashboardUseCase';
import { OrganizerSubscriptionEntityFactory } from '../../../infrastructure/factories/organizer/OrganizerSubscriptionEntityFactory';
import { BookingEntityFactory } from '../../../infrastructure/factories/user/BookingEntityFactory';
import { UserEntityFactory } from '../../../infrastructure/factories/user/UserEntityFactory';
import { OrganizerSubscriptionRepository } from '../../../infrastructure/repositories/organizer/OrganizerSubscriptionRepository';
import { BookingRepository } from '../../../infrastructure/repositories/user/booking/BookingRepository';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { WinstonLoggerService } from '../../../infrastructure/services/logger/loggerService';
import { AdminDashBoardController } from '../../../interfaceAdapter/controllers/admin/AdminDashboardContoller';

const userEntityFactory = new UserEntityFactory();
const loggerService = new WinstonLoggerService();
const userRepository = new UserRepository(loggerService, userEntityFactory);

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);
const subscriptionEntityFactory = new OrganizerSubscriptionEntityFactory();
const subscriptionRepository = new OrganizerSubscriptionRepository(
  subscriptionEntityFactory
);

const adminDashboardUseCase = new AdminDashboardUseCase(
  userRepository,
  bookingRepository,
  subscriptionRepository
);
export const adminDashBoardController = new AdminDashBoardController(
  adminDashboardUseCase
);
