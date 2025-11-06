import { CreateSubscriptionRequestRequestDTO } from "../../../../domain/DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { SubscriptionResponseDTO } from "../../../../domain/DTOs/admin/subscription-plans/SubscriptionResponseDTO";
import { SubscriptionPlansEntity } from "../../../../domain/entities/admin/SubscriptionPlansEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface ISubscriptionMapper extends IBaseMapper<SubscriptionPlansEntity, CreateSubscriptionRequestRequestDTO, SubscriptionResponseDTO> {};

