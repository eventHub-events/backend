import { OrganizerStripeAccountEntity } from '../../../../domain/entities/organizer/OrganizerStripeAccountEntity';
import { StripeAccountCreationDTO } from '../../../DTOs/organizer/stripe-account/StripeAccountCreationDTO';
import { StripeAccountResponseDTO } from '../../../DTOs/organizer/stripe-account/StripeAccountResponseDTO';
import { IBaseMapper } from '../../common/IBaseMapper';

export interface IOrganizerStripeAccountMapper extends IBaseMapper<
  OrganizerStripeAccountEntity,
  StripeAccountCreationDTO,
  StripeAccountResponseDTO
> {
  toResponseDTOList(
    entities: OrganizerStripeAccountEntity[]
  ): StripeAccountResponseDTO[];
}
