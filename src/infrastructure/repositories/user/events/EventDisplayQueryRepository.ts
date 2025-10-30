import { FilterQuery, PipelineStage, Types } from "mongoose";
import { EventDisplayEntity } from "../../../../domain/entities/user/EventDisplayEntity";
import { IEventDisplayQueryRepository } from "../../../../domain/repositories/user/IEventDisplayQueryRepository";
import { EventModel, IEvent } from "../../../db/models/organizer/events/EventsModel";
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
 async findFeaturedEvents(
    filters:{
   title?: string;
   location?: string;
   category?:string;
   page?: number;
   limit?: number
 } = {}
  ): Promise<{ data: EventDisplayEntity[]; totalPages: number }> {
    const {
      title,
      location,
      category,
      page,
      limit,
    } = filters;

    // ✅ Default behavior: if no pagination => limit = 6 (landing page)
    const effectiveLimit = limit ?? 6;
    const effectivePage = page ?? 1;

    // ✅ Match stage (strongly typed)
    const matchStage: FilterQuery<IEvent> = {
      featured: true,
      isDeleted: false,
    };

    if (title) matchStage.title = { $regex: title, $options: "i" };
    if (location) matchStage["location.venue"] = { $regex: location, $options: "i" };
    if (category) matchStage["category.name"] = { $regex: category, $options: "i" };

    // ✅ Pipeline (typed as `Record<string, unknown>[]` instead of `any[]`)
   const pipeline: PipelineStage[]= [
      {
        $lookup: {
          from: "eventmoderations",
          localField: "_id",
          foreignField: "eventId",
          as: "moderation",
        },
      },
      { $unwind: { path: "$moderation", preserveNullAndEmptyArrays: true } },
      { $match: { "moderation.eventApprovalStatus": "approved" } },
      { $match: matchStage },
      {
        $lookup: {
          from: "eventticketings",
          localField: "_id",
          foreignField: "eventId",
          as: "ticketing",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "organizerId",
          foreignField: "_id",
          as: "organizer",
        },
      },
      { $unwind: "$ticketing" },
      { $unwind: "$category" },
      { $unwind: "$organizer" },
      {
        $addFields: {
          price: {
            $min: {
              $map: {
                input: "$ticketing.tickets",
                as: "t",
                in: "$$t.price",
              },
            },
          },
          ticketsLeft: { $subtract: ["$totalCapacity", "$ticketing.ticketsSold"] },
          availability: {
            $multiply: [
              { $divide: ["$ticketing.ticketsSold", "$totalCapacity"] },
              100,
            ],
          },
          organizer: "$organizer.name",
          category: "$category.name",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          location: "$location.venue",
          category: 1,
          tags: 1,
          organizer: 1,
          ticketsLeft: 1,
          availability: 1,
          price: 1,
          images: 1,
        },
      },
    ];

    // ✅ Pagination logic (only if page/limit provided)
    const skip = (effectivePage - 1) * effectiveLimit;

    const [data, countResult] = await Promise.all([
      EventModel.aggregate([...pipeline, { $skip: skip }, { $limit: effectiveLimit }]),
      EventModel.aggregate([
        ...pipeline.slice(0, pipeline.findIndex((p) => "$project" in p) + 1),
        { $count: "total" },
      ]),
    ]);

    const totalDocs = countResult[0]?.total ?? 0;
    const totalPages = Math.ceil(totalDocs / effectiveLimit);

    return { data, totalPages };
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
        organizerId:1,
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