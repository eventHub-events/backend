export const EventDisplayRoutes= {
  EVENTS :{
    BASE:"/events",
    TRENDING: "/events/trending",
    UPCOMING: "/events/upcoming",
    DETAILS:(eventId: string) => `/events/${eventId}`
  }
}