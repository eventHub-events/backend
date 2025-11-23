import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import { EventReviewModel } from "../../../../domain/types/UserTypes";
import { IDomainFactory } from "../IDomainFactory";

export interface IEventReviewEntityFactory extends IDomainFactory<EventReviewModel, ReviewEntity>{};