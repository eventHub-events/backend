import { IDomainFactory } from "../IDomainFactory";

export interface IBookingEntityFactory<DbType, DomainType> extends IDomainFactory<DbType, DomainType>{}