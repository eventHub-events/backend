import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import { AddReviewDTO } from "../../../DTOs/common/review/addReviewDTO";
import { ReviewResponseDTO } from "../../../DTOs/common/review/reviewResponseDTO";
import { IReviewMapper } from "../../../interface/mapper/common/review/IReviewMapper";

export class ReviewMapper implements IReviewMapper {
  toEntity(dto: AddReviewDTO): ReviewEntity {
       return new ReviewEntity({
         targetId: dto.targetId,
         userId: dto.userId,
         targetType: dto.targetType,
         rating: dto.rating,
         review: dto.review,
         userName: dto.userName

       })
  }
  toResponseDTO(entity: ReviewEntity): ReviewResponseDTO {
       return {
          id: entity.id!,
          targetType : entity.targetType,
          rating: entity.rating,
          review : entity.review,
          userId: entity.userId,
          createdAt: entity.createdAt!,
          userName: entity.userName
       }
  }
  toResponseDTOList(entity: ReviewEntity[]): ReviewResponseDTO[] {
      return entity.map((e) => this.toResponseDTO(e));
  }
}