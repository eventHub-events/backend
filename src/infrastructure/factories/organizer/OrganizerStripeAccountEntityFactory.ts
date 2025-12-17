import { IStripeAccountEntityFactory } from "../../../application/interface/factories/organizer/IStripeAccountEntityFactory";
import { OrganizerStripeAccountEntity } from "../../../domain/entities/organizer/OrganizerStripeAccountEntity";
import { OrganizerStripeAccountDbModel } from "../../../domain/types/OrganizerTypes";


export class StripeAccountEntityFactory implements IStripeAccountEntityFactory {
  toDomain(dbModel: OrganizerStripeAccountDbModel): OrganizerStripeAccountEntity {
      return new OrganizerStripeAccountEntity({
        organizerId : dbModel.organizerId.toString(),
        stripeAccountId : dbModel.stripeAccountId,
        label : dbModel.label,
        isDefault : dbModel.isDefault,
        onboarded : dbModel.onboarded,
        createdAt : dbModel.createdAt,
        id:     dbModel._id.toString()

      })
  }
  toDomainList(dbModel: OrganizerStripeAccountDbModel[]): OrganizerStripeAccountEntity[] {
      return dbModel.map((m) => this.toDomain(m));
  }
}