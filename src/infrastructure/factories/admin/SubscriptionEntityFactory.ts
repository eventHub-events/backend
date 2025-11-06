import { ISubscriptionEntityFactory } from "../../../application/interface/factories/admin/ISubscriptionEntityFactory";
import { SubscriptionPlansEntity } from "../../../domain/entities/admin/SubscriptionPlansEntity";
import { SubscriptionPlansDbModel } from "../../../domain/types/AdminDbTypes";

export class SubscriptionEntityFactory implements ISubscriptionEntityFactory<SubscriptionPlansDbModel , SubscriptionPlansEntity> {
  toDomain(dbModel: SubscriptionPlansDbModel): SubscriptionPlansEntity {
       return new SubscriptionPlansEntity({
            id: dbModel._id,
            name: dbModel.name,
            price: dbModel.price,
            durationInDays: dbModel.durationInDays,
            description: dbModel.description,
            privileges : dbModel.privileges,
            isActive : dbModel.isActive,
            

       })
  }
  toDomainList(dbModel: SubscriptionPlansDbModel[]): SubscriptionPlansEntity[] {
      return dbModel.map((model) => this.toDomain(model))
  }
}