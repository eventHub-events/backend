
export interface IDomainFactory<DbType, DomainType>{
  toDomain(dbModel: DbType): DomainType;
  toDomainList(dbModel: DbType[]):DomainType[]

}