import { ReviewEntity } from "../../../../../domain/entities/user/ReviewEntity";
import { AddReviewDTO } from "../../../../DTOs/common/review/addReviewDTO";
import { ReviewResponseDTO } from "../../../../DTOs/common/review/reviewResponseDTO";
import { IBaseMapper } from "../../../common/IBaseMapper";

export interface IReviewMapper extends IBaseMapper<ReviewEntity, AddReviewDTO, ReviewResponseDTO> {
   toResponseDTOList(entity: ReviewEntity[]): ReviewResponseDTO[];
}