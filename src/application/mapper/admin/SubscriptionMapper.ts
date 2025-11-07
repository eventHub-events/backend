import { CreateSubscriptionRequestRequestDTO } from "../../DTOs/admin/subscription-plans/CreateSubscriptionRequestDTO";
import { SubscriptionResponseDTO } from "../../DTOs/admin/subscription-plans/SubscriptionResponseDTO";
import { SubscriptionPlansEntity } from "../../../domain/entities/admin/SubscriptionPlansEntity";
import { ISubscriptionMapper } from "../../interface/mapper/admin/ISubscriptionMapper";

export class SubscriptionMapper implements ISubscriptionMapper {
  toEntity(dto: CreateSubscriptionRequestRequestDTO): SubscriptionPlansEntity {
      return new SubscriptionPlansEntity({
            name: dto.name,
            price: dto.price,
            durationInDays: dto.durationInDays,
            description: dto.description,
            privileges: dto.privileges,
            isActive: dto.isActive ?? true


      })
  }
  // toEntityForUpdate(dto: Partial<SubscriptionPlansEntity>): Partial<SubscriptionPlansEntity> {
      
  // }
  toResponseDTO(entity: SubscriptionPlansEntity): SubscriptionResponseDTO {
      return  {
          name: entity.name,
          price: entity.price,
          durationInDays: entity.durationInDays,
          description: entity.description,
          isActive:  entity.isActive,
          privileges: entity.privileges,
          createdAt: entity.createdAt

      }
  }
 toResponseDTOList(entity: SubscriptionPlansEntity[]): SubscriptionResponseDTO[] {
       return entity.map((e)  => this.toResponseDTO(e))
 }
}