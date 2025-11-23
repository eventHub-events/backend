import { ReviewEntity } from "../../../../domain/entities/user/ReviewEntity";
import {  ReviewDBModel } from "../../../../domain/types/UserTypes";
import { IDomainFactory } from "../IDomainFactory";

export interface IReviewEntityFactory extends IDomainFactory<ReviewDBModel, ReviewEntity>{};