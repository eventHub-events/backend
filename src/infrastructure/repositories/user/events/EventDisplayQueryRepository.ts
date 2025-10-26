import { EventDisplayEntity } from "../../../../domain/entities/user/EventDisplayEntity";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { EventModel } from "../../../db/models/organizer/events/EventsModel";

export class EventDisplayQueryRepository implements  IEventDisplayQueryRepository {
 async findTrendingEvents(): Promise<EventDisplayEntity[]> {
     return EventModel.aggregate([
      {$lookup:{
         from: "eventmoderations",
         localField: "_id",
         foreignField : "eventId",
         as: "moderation"
      }
         
      },
      {
        $lookup : {
           from :"eventticketings",
           localField: "_id",
           foreignField: "eventId",
           as:"ticketing"
        }
      },
      {
        $lookup : {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as:"category"
        }
      },
       {
         $unwind : {
             path: "$moderation",
             preserveNullAndEmptyArrays : true
         },
       },
       {
         $unwind : {
             path:"$ticketing",
             preserveNullAndEmptyArrays : true
         }
       },
       {
         $unwind: {
           path:"$category",
           preserveNullAndEmptyArrays : true
         }
       },
        {
           $match : {
            "moderation.eventApprovalStatus": "approved"
           }
        },
          {
        $addFields: {
          attendees: { $ifNull: ["$ticketing.ticketsSold", 0] },
          price: {
            $min: {
              $map: {
                input: "$ticketing.tickets",
                as: "t",
                in: "$$t.price",
              },
            },
          },
        },
      },

        {
          $sort:  {
             createdAt: -1
          }
        },
        {
          $limit :10
        },
        {
          $project: {
            _id:1,
             title : 1,
             category:"$category.name",
             tags:1,
             startDate: 1,
             images: 1,
             location:"$location.venue",
             attendees: 1,
             price: 1

          }
        }
     ])
 }
}