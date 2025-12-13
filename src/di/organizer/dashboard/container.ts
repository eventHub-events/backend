import { GetEarningsOverviewUseCase } from '../../../application/useCases/organizer/dashboard/GetEarningsOverviewUseCase';
import { GetEarningsPerformanceUseCase } from '../../../application/useCases/organizer/dashboard/GetEarningsPerformanceUseCase';
import { GetKycStatusUseCase } from '../../../application/useCases/organizer/dashboard/GetOrganizerKycStatusUseCase';
import { GetPayoutSummaryUseCase } from '../../../application/useCases/organizer/dashboard/GetPayoutSummaryUseACase';
import { GetSubscriptionSummaryUseCase } from '../../../application/useCases/organizer/dashboard/GetSubscriptionSummaryUseCase';
import { GetTicketsOverviewUseCase } from '../../../application/useCases/organizer/dashboard/GetTicketsOverviewUseCase';
import { OrganizerDashboardDetailsUseCase } from '../../../application/useCases/organizer/dashboard/OrganizerDashboardDetailsUseCase';
import { OrganizerDashboardUseCase } from '../../../application/useCases/organizer/dashboard/OrganizerDashboardUseCase';
import { BookingEntityFactory } from '../../../infrastructure/factories/user/BookingEntityFactory';
import { OrganizerDashboardRepository } from '../../../infrastructure/repositories/organizer/OrganizerDashboardRepository';
import { BookingRepository } from '../../../infrastructure/repositories/user/booking/BookingRepository';
import { OrganizerDashboardController } from '../../../interfaceAdapter/controllers/organizer/OrganizerDashboardController';

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);

const organizerDashboardUseCase = new OrganizerDashboardUseCase(
  bookingRepository
);
const organizerDashboardRepo = new OrganizerDashboardRepository();
const getTicketsOverviewUseCase = new GetTicketsOverviewUseCase(
  organizerDashboardRepo
);
const getEarningsOverviewUseCase = new GetEarningsOverviewUseCase(
  organizerDashboardRepo
);
const getEventPerformanceUseCase = new GetEarningsPerformanceUseCase(
  organizerDashboardRepo
);
const payoutSummaryUseCase = new GetPayoutSummaryUseCase(
  organizerDashboardRepo
);
const getSubscriptionSummaryUseCase = new GetSubscriptionSummaryUseCase(
  organizerDashboardRepo
);
const getKycStatusUseCase = new GetKycStatusUseCase(organizerDashboardRepo);

const organizerDashboardDetailsUseCase = new OrganizerDashboardDetailsUseCase(
  getTicketsOverviewUseCase,
  getEarningsOverviewUseCase,
  getEventPerformanceUseCase,
  payoutSummaryUseCase,
  getSubscriptionSummaryUseCase,
  getKycStatusUseCase
);

export const organizerDashboardController = new OrganizerDashboardController(
  organizerDashboardUseCase,
  organizerDashboardDetailsUseCase
);
