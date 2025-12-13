import { IDomainFactory } from '../IDomainFactory';

export interface ISubscriptionEntityFactory<
  DbType,
  DomainType,
> extends IDomainFactory<DbType, DomainType> {}
