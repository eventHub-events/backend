import { IOrganizerSubscriptionEntityFactory } from "../../../application/interface/factories/organizer/IOrganizerSubscriptionEntityFactory";
import { OrganizerSubscriptionEntity } from "../../../domain/entities/organizer/OrganizerSubscriptionEntity";
import { OrganizerSubscriptionDbModel } from "../../../domain/types/OrganizerTypes";

export class OrganizerSubscriptionEntityFactory implements IOrganizerSubscriptionEntityFactory  {
  toDomain(dbModel: OrganizerSubscriptionDbModel): OrganizerSubscriptionEntity {
      return new OrganizerSubscriptionEntity({
          id: dbModel._id.toString(),
          organizerId: dbModel.organizerId,
          organizerName:dbModel.organizerName,
          organizerEmail: dbModel.organizerEmail,
          planId :dbModel.planId,
          planName : dbModel.planName,
          startDate : dbModel.startDate,
          endDate : dbModel.endDate,
          status : dbModel.status,
          paymentId : dbModel.paymentId,
          payoutDelayDays: dbModel.payoutDelayDays
          
  })
}
  toDomainList(dbModel: OrganizerSubscriptionDbModel[]): OrganizerSubscriptionEntity[] {
     
    return dbModel.map((model) => this.toDomain(model))
  }
}