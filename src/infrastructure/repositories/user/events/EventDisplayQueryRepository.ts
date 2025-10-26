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
 findFeaturedEvents(): Promise<EventDisplayEntity[]> {
     return EventModel.aggregate([
       {$match:{featured: true, isDeleted: false}},

       {$lookup: {
         from: "eventmoderations",
         localField:"_id",
         foreignField: "eventId",
         as:"moderation"
       }},

       {$lookup: {
          from: "eventticketings",
          localField:"_id",
          foreignField:"eventId",
          as:"ticketing"
       }},

       {$lookup: {
          from:"categories",
          localField:"categoryId",
          foreignField:"_id",
          as:"category"
       }},

       {$lookup: {
          from: "users",
          localField:"organizerId",
          foreignField: "_id",
          as: "organizer"
       }},
       {$unwind: "$ticketing"},
       {$unwind:"$category"},
       {$unwind:"$organizer"},
       {$match: {"moderation.eventApprovalStatus": "approved"}},

        {
        $addFields: {
          price: {
            $min: {
              $map: {
                input: "$ticketing.tickets",
                as: "t",
                in: "$$t.price"
              }
            }
          },
          ticketsLeft: { $subtract: ["$totalCapacity", "$ticketing.ticketsSold"] },
          availability: {
            $multiply: [
              { $divide: ["$ticketing.ticketsSold", "$totalCapacity"] },
              100
            ]
          },
          organizer: "$organizer.name",
          category: "$category.name"
        }
      },
       {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          location: "$location.venue",
          category: 1,
          tags:1,
          organizer: 1,
          ticketsLeft: 1,
          availability: 1,
          price: 1,
          images: 1
        }
      }

     ])
 }
}