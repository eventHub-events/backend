import { NotFoundError, UnauthorizedError } from "../../../../../domain/errors/common";
import { IBookingRepository } from "../../../../../domain/repositories/user/IBookingRepository";
import { IReviewRepository } from "../../../../../domain/repositories/user/IReviewRepository";
import { ReviewType } from "../../../../../infrastructure/types/review/review";
import { AddReviewDTO } from "../../../../DTOs/common/review/addReviewDTO";
import { ReviewResponseDTO } from "../../../../DTOs/common/review/reviewResponseDTO";
import { IAddEventReviewUseCase } from "../../../../interface/common/useCase/review/event/IAddEventReviewUseCase";
import { IReviewMapper } from "../../../../interface/mapper/common/review/IReviewMapper";

export class AddEventReviewUseCase implements IAddEventReviewUseCase {
   constructor(
      private _bookingRepo : IBookingRepository,
      private _reviewRepo : IReviewRepository,
      private _reviewMapper : IReviewMapper
   ){}

 async execute( dto: AddReviewDTO): Promise<ReviewResponseDTO> {
       
        const hasBooked = await this._bookingRepo.findBookingsByEventIdAndUserId(dto.targetId, dto.userId);
           if(!hasBooked) throw new NotFoundError("You must book this event before reviewing.");

          const existing = await this._reviewRepo.findReviewByUserAndTarget(dto.userId, dto.targetId, ReviewType.EVENT);
            if(!existing) throw new UnauthorizedError("You have already reviewed this event");
   
        const reviewEntity = this._reviewMapper.toEntity(dto);
   
         const  created = await this._reviewRepo.createReview(reviewEntity);

   return this._reviewMapper.toResponseDTO(created);
   

 }
}