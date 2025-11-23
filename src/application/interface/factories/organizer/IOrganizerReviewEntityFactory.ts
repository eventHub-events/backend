import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import { OrganizerReviewModel } from "../../../../domain/types/UserTypes";
import { IDomainFactory } from "../IDomainFactory";

export interface IOrganizerReviewEntityFactory extends IDomainFactory<OrganizerReviewModel, ReviewEntity>{}