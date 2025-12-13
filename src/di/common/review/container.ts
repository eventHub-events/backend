import { ReviewMapper } from '../../../application/mapper/common/review/ReviewMapper';
import { DeleteReviewUseCase } from '../../../application/useCases/common/review/common/DeleteReviewUseCase';
import { GetRatingSummaryUseCase } from '../../../application/useCases/common/review/common/GetRatingSummaryUseCase';
import { GetReviewsUseCase } from '../../../application/useCases/common/review/common/GetReviewsUseCase';
import { UpdateReviewUseCase } from '../../../application/useCases/common/review/common/UpdateReviewUseCase';
import { AddEventReviewUseCase } from '../../../application/useCases/common/review/event/AddEventReviewUseCase';
import { AddOrganizerReviewUseCase } from '../../../application/useCases/common/review/organizer/AddOrganizerReviewUseCase';
import { GetOrganizerReviewsUseCase } from '../../../application/useCases/organizer/review/GetOrganizerReviewsUseCase';
import { BookingEntityFactory } from '../../../infrastructure/factories/user/BookingEntityFactory';
import { ReviewEntityFactory } from '../../../infrastructure/factories/user/ReviewEntityFactory';
import { BookingRepository } from '../../../infrastructure/repositories/user/booking/BookingRepository';
import { ReviewRepository } from '../../../infrastructure/repositories/user/review/ReviewRepository';
import { ReviewController } from '../../../interfaceAdapter/controllers/common/ReviewController';

const reviewEntityFactory = new ReviewEntityFactory();
const reviewRepository = new ReviewRepository(reviewEntityFactory);

const reviewMapper = new ReviewMapper();

const bookingEntityFactory = new BookingEntityFactory();
const bookingRepository = new BookingRepository(bookingEntityFactory);

const addEventReviewUseCase = new AddEventReviewUseCase(
  reviewRepository,
  reviewMapper,
  bookingRepository
);
const addOrganizerReviewUseCase = new AddOrganizerReviewUseCase(
  bookingRepository,
  reviewRepository,
  reviewMapper
);
const updateReviewUseCase = new UpdateReviewUseCase(
  reviewRepository,
  reviewMapper
);
const deleteReviewUseCase = new DeleteReviewUseCase(reviewRepository);
const getReviewUseCase = new GetReviewsUseCase(reviewRepository, reviewMapper);
const getReviewRatingsSummary = new GetRatingSummaryUseCase(reviewRepository);
const getOrganizerReviewsUseCase = new GetOrganizerReviewsUseCase(
  reviewRepository,
  reviewMapper
);

export const reviewController = new ReviewController(
  addEventReviewUseCase,
  addOrganizerReviewUseCase,
  updateReviewUseCase,
  deleteReviewUseCase,
  getReviewUseCase,
  getReviewRatingsSummary,
  getOrganizerReviewsUseCase
);
