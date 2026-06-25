import { FilterQuery, PipelineStage, Types } from 'mongoose';
import { EventDisplayEntity } from '../../../../domain/entities/user/EventDisplayEntity';
import { IEventDisplayQueryRepository } from '../../../../domain/repositories/user/IEventDisplayQueryRepository';
import {
  EventModel,
  IEvent,
} from '../../../db/models/organizer/events/EventsModel';
import { EventDetailsEntity } from '../../../../domain/entities/user/EventDetailsEntity';
import { IEventSearchCriteria } from '../../../../domain/queries/EventSearchCriteria';
import { UpcomingEventsDetails } from '../../../../domain/entities/user/UpcomingEventsDetails';

export class EventDisplayQueryRepository implements IEventDisplayQueryRepository {
  async findTrendingEvents(): Promise<EventDisplayEntity[]> {
    return await EventModel.aggregate([
      {
        $lookup: {
          from: 'eventmoderations',
          localField: '_id',
          foreignField: 'eventId',
          as: 'moderation',
        },
      },
      {
        $lookup: {
          from: 'eventticketings',
          localField: '_id',
          foreignField: 'eventId',
          as: 'ticketing',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$moderation',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$ticketing',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'moderation.eventApprovalStatus': 'approved',
          status: { $in: ['upcoming', 'active'] },
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: 'bookings',
          let: { eventId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$eventId', '$$eventId'] },
                    { $eq: ['$status', 'confirmed'] },
                  ],
                },
              },
            },
            { $unwind: '$tickets' },
            {
              $group: {
                _id: null,
                ticketsSold: { $sum: '$tickets.quantity' },
              },
            },
          ],
          as: 'bookingStats',
        },
      },

      {
        $addFields: {
          attendees: {
            $ifNull: [{ $arrayElemAt: ['$bookingStats.ticketsSold', 0] }, 0],
          },
          price: {
            $min: {
              $map: {
                input: '$ticketing.tickets',
                as: 't',
                in: '$$t.price',
              },
            },
          },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: '$category.name',
          tags: 1,
          startDate: 1,
          endDate:1,
          status:1,
          images: 1,
          location: '$location.venue',
          attendees: 1,
          price: 1,
        },
      },
    ]);
  }
  async findFeaturedEvents(
    filters: {
      title?: string;
      location?: string;
      category?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{ data: EventDisplayEntity[]; totalPages: number }> {
    const { title, location, category, page, limit } = filters;

  
    const effectiveLimit = limit ?? 6;
    const effectivePage = page ?? 1;


    const matchStage: FilterQuery<IEvent> = {
      featured: true,
      isDeleted: false,
       status: {
    $in: ['upcoming', 'active'],
  },
    };

    if (title) matchStage.title = { $regex: title, $options: 'i' };
    if (location)
      matchStage['location.venue'] = { $regex: location, $options: 'i' };
   
    if (category) matchStage.category = { $regex: category, $options: 'i' };

   
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'eventmoderations',
          localField: '_id',
          foreignField: 'eventId',
          as: 'moderation',
        },
      },
      { $unwind: { path: '$moderation', preserveNullAndEmptyArrays: true } },
      { $match: { 'moderation.eventApprovalStatus': 'approved' } },
      { $match: matchStage },
      {
        $lookup: {
          from: 'eventticketings',
          localField: '_id',
          foreignField: 'eventId',
          as: 'ticketing',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'organizerId',
          foreignField: '_id',
          as: 'organizer',
        },
      },
      { $unwind: '$ticketing' },
      { $unwind: '$category' },
      { $unwind: '$organizer' },
      {
        $lookup: {
          from: 'bookings',
          let: { eventId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$eventId', '$$eventId'] },
                    { $eq: ['$status', 'confirmed'] },
                  ],
                },
              },
            },
            { $unwind: '$tickets' },
            {
              $group: {
                _id: null,
                ticketsSold: { $sum: '$tickets.quantity' },
              },
            },
          ],
          as: 'bookingStats',
        },
      },

      {
        $addFields: {
          price: {
            $min: {
              $map: {
                input: '$ticketing.tickets',
                as: 't',
                in: '$$t.price',
              },
            },
          },
          ticketsSold: {
            $ifNull: [{ $arrayElemAt: ['$bookingStats.ticketsSold', 0] }, 0],
          },
          ticketsLeft: {
            $subtract: [
              '$totalCapacity',
              {
                $ifNull: [
                  { $arrayElemAt: ['$bookingStats.ticketsSold', 0] },
                  0,
                ],
              },
            ],
          },
          availability: {
            $cond: [
              { $gt: ['$totalCapacity', 0] },
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $ifNull: [
                          { $arrayElemAt: ['$bookingStats.ticketsSold', 0] },
                          0,
                        ],
                      },
                      '$totalCapacity',
                    ],
                  },
                  100,
                ],
              },
              0,
            ],
          },
          organizer: '$organizer.name',
          category: '$category.name',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          endDate:1,
          location: '$location.venue',
          category: 1,
          tags: 1,
          status:1,
          organizer: 1,
          ticketsLeft: 1,
          availability: 1,
          price: 1,
          images: 1,
        },
      },
    ];

  
    const skip = (effectivePage - 1) * effectiveLimit;

    const [data, countResult] = await Promise.all([
      EventModel.aggregate([
        ...pipeline,
        { $skip: skip },
        { $limit: effectiveLimit },
      ]),
      EventModel.aggregate([
        ...pipeline.slice(0, pipeline.findIndex(p => '$project' in p) + 1),
        { $count: 'total' },
      ]),
    ]);

    const totalDocs = countResult[0]?.total ?? 0;
    const totalPages = Math.ceil(totalDocs / effectiveLimit);

    return { data, totalPages };
  }
  async findEventById(eventId: string): Promise<EventDetailsEntity | null> {
    const objectId = new Types.ObjectId(eventId);
    const result = await EventModel.aggregate([
      { $match: { _id: objectId, isDeleted: false } },

      {
        $lookup: {
          from: 'eventmoderations',
          localField: '_id',
          foreignField: 'eventId',
          as: 'moderation',
        },
      },
      {
        $unwind: {
          path: '$moderation',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'moderation.eventApprovalStatus': 'approved',
        },
      },
      {
        $lookup: {
          from: 'eventticketings',
          localField: '_id',
          foreignField: 'eventId',
          as: 'ticketing',
        },
      },
      {
        $unwind: {
          path: '$ticketing',
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'organizerId',
          foreignField: '_id',
          as: 'organizer',
        },
      },
      {
        $unwind: {
          path: '$organizer',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          bannerImage: { $arrayElemAt: ['$images', 0] },
          tickets: '$ticketing.tickets',
          totalCapacity: '$totalCapacity',
          venue: '$location.venue',
          organizerName: '$organizer.name',

          category: '$category.name',
          organizerStripeAccountId: '$organizer.stripeAccountId',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          venue: 1,
          location: 1,
          tags: 1,
          startDate: 1,
          status:1,
          startTime:1,
          endTime:1,
          endDate:1,
          images: 1,
          organizerId: 1,
          totalCapacity: 1,
          category: 1,
          tickets: 1,
          organizerName: 1,
          stripeAccountId: 1,
          organizerStripeAccountId: 1,
        },
      },
    ]);
    return result.length > 0 ? result[0] : null;
  }
  async searchEvents(
    filters: IEventSearchCriteria
  ): Promise<{ data: EventDisplayEntity[]; totalPages: number }> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 6;
    const skip = (page - 1) * limit;

    const { location } = filters;

    const matchEvent: FilterQuery<IEvent> = {
      isDeleted: false,
    };
    if (filters.title)
      matchEvent.title = { $regex: filters.title, $options: 'i' };
    if (filters.location)
      matchEvent['location.venue'] = { $regex: location, $options: 'i' };

    const pipeline: PipelineStage[] = [
    
      {
        $lookup: {
          from: 'eventmoderations',
          localField: '_id',
          foreignField: 'eventId',
          as: 'moderation',
        },
      },
      { $unwind: '$moderation' },
      { $match: { 'moderation.eventApprovalStatus': 'approved' } },

     
      { $match: matchEvent },

     
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },

   
      {
        $lookup: {
          from: 'users',
          localField: 'organizerId',
          foreignField: '_id',
          as: 'organizer',
        },
      },
      { $unwind: '$organizer' },

      
      {
        $lookup: {
          from: 'eventticketings',
          localField: '_id',
          foreignField: 'eventId',
          as: 'ticketing',
        },
      },
      { $unwind: '$ticketing' },

      {
        $lookup: {
          from: 'bookings',
          let: { eventId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$eventId', '$$eventId'] },
                    { $eq: ['$status', 'confirmed'] },
                  ],
                },
              },
            },
            { $unwind: '$tickets' },
            {
              $group: {
                _id: null,
                ticketsSold: { $sum: '$tickets.quantity' },
              },
            },
          ],
          as: 'bookingStats',
        },
      },
    ];


    if (filters.category) {
      pipeline.push({
        $match: {
          'category.name': { $regex: filters.category, $options: 'i' },
        },
      });
    }

   
    if (filters.organizer) {
      pipeline.push({
        $match: {
          'organizer.name': { $regex: filters.organizer, $options: 'i' },
        },
      });
    }

   
    if (filters.search) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: filters.search, $options: 'i' } },
            { 'location.venue': { $regex: filters.search, $options: 'i' } },
            { 'category.name': { $regex: filters.search, $options: 'i' } },
            { 'organizer.name': { $regex: filters.search, $options: 'i' } },
          ],
        },
      });
    }

    pipeline.push(
      {
        $addFields: {
          price: { $min: '$ticketing.tickets.price' },

          ticketsSold: {
            $ifNull: [{ $arrayElemAt: ['$bookingStats.ticketsSold', 0] }, 0],
          },

          ticketsLeft: {
            $subtract: [
              '$totalCapacity',
              {
                $ifNull: [
                  { $arrayElemAt: ['$bookingStats.ticketsSold', 0] },
                  0,
                ],
              },
            ],
          },

          availability: {
            $cond: [
              { $gt: ['$totalCapacity', 0] },
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $ifNull: [
                          { $arrayElemAt: ['$bookingStats.ticketsSold', 0] },
                          0,
                        ],
                      },
                      '$totalCapacity',
                    ],
                  },
                  100,
                ],
              },
              0,
            ],
          },

          organizer: '$organizer.name',
          category: '$category.name',
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          endDate:1,
          location: '$location.venue',
          category: 1,
          tags: 1,
          status:1,
          organizer: 1,
          ticketsLeft: 1,
          availability: 1,
          price: 1,
          images: 1,
        },
      },
      { $skip: skip },
      { $limit: limit }
    );

   
    const [data, count] = await Promise.all([
      EventModel.aggregate(pipeline),
      EventModel.aggregate([
        ...pipeline.slice(
          0,
          pipeline.findIndex(p => '$project' in p)
        ),
        { $count: 'total' },
      ]),
    ]);

    return {
      data,
      totalPages: Math.ceil((count[0]?.total ?? 0) / limit),
    };
  }
  async upcomingEvents(): Promise<UpcomingEventsDetails[]> {
    const now = new Date();

    const result = await EventModel.aggregate([
 
      {
        $match: {
          startDate: { $gte: now },
          isDeleted: false,
          visibility: 'public',
          approvedStatus: 'approved',
          status: { $in: ['upcoming', 'active'] },
        },
      },

  
      {
        $lookup: {
          from: 'eventticketings',
          localField: '_id',
          foreignField: 'eventId',
          as: 'ticketing',
        },
      },
      { $unwind: '$ticketing' },

      
      {
        $lookup: {
          from: 'users',
          localField: 'organizerId',
          foreignField: '_id',
          as: 'organizer',
        },
      },
      {
        $unwind: {
          path: '$organizer',
          preserveNullAndEmptyArrays: true,
        },
      },

    
      {
        $lookup: {
          from: 'bookings',
          let: { eventId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$eventId', '$$eventId'] },
                    { $eq: ['$status', 'confirmed'] },
                  ],
                },
              },
            },
            { $unwind: '$tickets' },
            {
              $group: {
                _id: null,
                ticketsSold: { $sum: '$tickets.quantity' },
              },
            },
          ],
          as: 'bookingStats',
        },
      },

     
      {
        $addFields: {
          ticketsSold: {
            $ifNull: [{ $arrayElemAt: ['$bookingStats.ticketsSold', 0] }, 0],
          },
          ticketsLeft: {
            $subtract: [
              '$totalCapacity',
              {
                $ifNull: [
                  { $arrayElemAt: ['$bookingStats.ticketsSold', 0] },
                  0,
                ],
              },
            ],
          },
          availability: {
            $cond: [
              { $gt: ['$totalCapacity', 0] },
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $ifNull: [
                          { $arrayElemAt: ['$bookingStats.ticketsSold', 0] },
                          0,
                        ],
                      },
                      '$totalCapacity',
                    ],
                  },
                  100,
                ],
              },
              0,
            ],
          },
          organizer: '$organizer.name',
        },
      },

   
      {
        $match: {
          ticketsLeft: { $gt: 0 },
        },
      },

    
      {
        $sort: {
          startDate: 1,
          ticketsSold: -1,
        },
      },

   
      { $limit: 6 },

      
      {
        $project: {
          eventId: { $toString: '$_id' },
          title: 1,
          description: 1,
          startDate: 1,
          endDate:1,
          location: '$location.venue',
          images: 1,
          category: 1,
          ticketsLeft: 1,
          availability: 1,
          organizer: 1,
          status:1
        },
      },
    ]);

    return result;
  }
}
