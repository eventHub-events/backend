import { OrganizerStripeAccountEntity } from "../../../domain/entities/organizer/OrganizerStripeAccountEntity";
import { StripeAccountCreationDTO } from "../../DTOs/organizer/stripe-account/StripeAccountCreationDTO";
import { StripeAccountResponseDTO } from "../../DTOs/organizer/stripe-account/StripeAccountResponseDTO";
import { IOrganizerStripeAccountMapper } from "../../interface/mapper/organizer/IOrganizerStripeAccountMapper";

export class OrganizerStripeAccountMapper implements IOrganizerStripeAccountMapper {
  toEntity(dto: StripeAccountCreationDTO): OrganizerStripeAccountEntity {
      return new OrganizerStripeAccountEntity({
        organizerId : dto.organizerId,
        stripeAccountId : dto.stripeAccountId,
        label : dto.label
      })
  }
  toResponseDTO(entity: OrganizerStripeAccountEntity): StripeAccountResponseDTO {
      return {
         organizerId : entity.organizerId,
         stripeAccountId : entity.stripeAccountId,
        label : entity.label,
        createdAt : entity.createdAt,
        id : entity.id,
        isDefault : entity.isDefault,
        isActive: entity.isActive, 
        onboarded: entity.onboarded
}
      }
  toResponseDTOList(entities: OrganizerStripeAccountEntity[]): StripeAccountResponseDTO[] {
      return entities.map((m) => this.toResponseDTO(m));
  }
  }
