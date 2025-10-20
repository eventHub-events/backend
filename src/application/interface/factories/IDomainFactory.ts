
export interface IDomainFactory<DbType, DomainType>{
  toDomain(dbModel: DbType): DomainType;
  toDomainList(dbModel: DbType[]):DomainType[];


}

export interface  IOrganizerProfileEntityFactory<DbType, DomainType, userType, CompositeReturnType> extends IDomainFactory<DbType , DomainType> {
  toDomain(dbModel: DbType): DomainType;
  toDomainList(dbModel: DbType[]): DomainType[];
  toCompositeDomain(dbModel: DbType & {organizerId?:  userType}): CompositeReturnType  | null;
  toPersistence(entity: DomainType): Record<string, unknown>;
  
}