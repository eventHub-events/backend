import { IDomainFactory } from '../IDomainFactory';

export interface IEventModerationEntityFactory<
  DbType,
  DomainType,
> extends IDomainFactory<DbType, DomainType> {}
