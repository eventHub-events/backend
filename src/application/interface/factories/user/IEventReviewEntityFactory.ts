import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import { EventReviewDBModel } from "../../../../domain/types/UserTypes";
import { IDomainFactory } from "../IDomainFactory";

export interface IEventReviewEntityFactory extends IDomainFactory<EventReviewDBModel, ReviewEntity>{};