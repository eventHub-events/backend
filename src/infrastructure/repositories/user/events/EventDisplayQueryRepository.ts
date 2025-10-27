import { Types } from "mongoose";
import { EventDisplayEntity } from "../../../../domain/entities/user/EventDisplayEntity";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { EventModel } from "../../../db/models/organizer/events/EventsModel";
import { EventDetailsEntity } from "../../../../domain/entities/user/EventDetailsEntity";

export class EventDisplayQueryRepository implements  IEventDisplayQueryRepository {
 async findTrendingEvents(): Promise<EventDisplayEntity[]> {
     return await EventModel.aggregate([
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
 async findFeaturedEvents(): Promise<EventDisplayEntity[]> {
     return await EventModel.aggregate([
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
async findEventById(eventId: string): Promise<EventDetailsEntity| null> {
    const objectId = new Types.ObjectId(eventId);
  const  result =  await EventModel.aggregate([
        {$match: {_id:objectId, isDeleted: false}},

        {$lookup: {
           from: "eventmoderations",
           localField: "_id",
           foreignField: "eventId",
           as:"moderation"

        }},
       {
         $unwind :{
           path:"$moderation",
           preserveNullAndEmptyArrays: true
         }
       },
       {$match: {
         "moderation.eventApprovalStatus":"approved"
       }},
       {
        $lookup : {
           from: "eventticketings",
           localField:"_id",
           foreignField:"eventId",
           as:"ticketing"
        }
       },
       {$unwind: {
         path:"$ticketing",
         preserveNullAndEmptyArrays: true
       }},
       
     {$lookup: {
        from:"categories",
        localField:"categoryId",
        foreignField:"_id",
        as:"category"
     }},
     {$unwind :{
         path: "$category",
         preserveNullAndEmptyArrays: true

     }},
     {
      $lookup: {
          from:"users",
          localField:"organizerId",
          foreignField:"_id",
          as: "organizer"
      }
     },
     {$unwind :{
         path: "$organizer",
         preserveNullAndEmptyArrays: true

     }},
       {
        $addFields: {
          bannerImage: { $arrayElemAt: ["$images", 0] },
          tickets: "$ticketing.tickets",
          totalCapacity: "$totalCapacity",
          venue: "$location.venue",
          organizerName: "$organizer.name",
          
          category:"$category.name",

        },
      },
     {
      $project : {
        _id: 1,
        title: 1,
        description:1,
        venue:1,
        location:1,
        tags:1,
        startDate:1,
        images:1,
        totalCapacity:1,
        category:1,
        tickets:1,
        organizerName:1



      }
     }


     ])
     return result.length > 0 ? result[0] : null;
}
}