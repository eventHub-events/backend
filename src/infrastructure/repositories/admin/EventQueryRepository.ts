import { IEventAdminView } from "../../../domain/entities/admin/IEventAdminView";
import { IEventQueryRepository } from "../../../domain/repositories/admin/IEventQueryRepository";
import { EventModel } from "../../db/models/organizer/events/EventsModel";

export class EventQueryRepository implements IEventQueryRepository {
  async findAllEventsForAdmin(): Promise<IEventAdminView[]> {
      const result = await EventModel.aggregate([
         {$lookup: {
             from:"eventmoderations",
             localField:"_id",
             foreignField: "eventId",
             as: "moderation"
         },
        },
        {
          $lookup:{
            from: "eventticketings",
            localField:"_id",
            foreignField: "eventId",
            as:"ticketing"
          },

        },
        {
          $lookup:{
             from:"categories",
             localField: "categoryId",
             foreignField:"_id",
             as:"category"
          }
        },
        {$unwind: {
           path:"$moderation",
           preserveNullAndEmptyArrays: true
        },
        },
        {
          $unwind :{
             path:"$ticketing",
             preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path:"$category",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project:{
            _id: 1,
           title: 1,
           type: 1,
           "category.name":1,
           startDate: 1,
           endDate: 1,
           status: 1,
           approvedStatus: 1,
           featured: 1,
           "moderation.eventApprovalStatus": 1,
          "moderation.isBlocked": 1,
          "moderation.blockedReason": 1,
          "ticketing.totalRevenue": 1,
          "ticketing.ticketsSold": 1,
           location:1
        }
      }
      ])
      return result
  }

}