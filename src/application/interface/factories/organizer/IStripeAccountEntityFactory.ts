import { OrganizerStripeAccountEntity } from '../../../../domain/entities/organizer/OrganizerStripeAccountEntity';
import { OrganizerStripeAccountDbModel } from '../../../../domain/types/OrganizerTypes';
import { IDomainFactory } from '../IDomainFactory';

export interface IStripeAccountEntityFactory extends IDomainFactory<
  OrganizerStripeAccountDbModel,
  OrganizerStripeAccountEntity
> {}
