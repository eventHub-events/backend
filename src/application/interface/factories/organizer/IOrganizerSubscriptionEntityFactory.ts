import { IDomainFactory } from '../IDomainFactory';
import { OrganizerSubscriptionEntity } from '../../../../domain/entities/organizer/OrganizerSubscriptionEntity';
import { OrganizerSubscriptionDbModel } from '../../../../domain/types/OrganizerTypes';

export interface IOrganizerSubscriptionEntityFactory extends IDomainFactory<
  OrganizerSubscriptionDbModel,
  OrganizerSubscriptionEntity
> {}
