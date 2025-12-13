import { IDomainFactory } from '../IDomainFactory';

export interface IUserEntityFactory<DbType, DomainType> extends IDomainFactory<
  DbType,
  DomainType
> {}
