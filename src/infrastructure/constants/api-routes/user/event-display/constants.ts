export const EventDisplayRoutes= {
  EVENTS :{
    BASE:"/events",
    TRENDING: "/events/trending",
    FEATURED:"/events/featured",
    UPCOMING: "/events/upcoming",
    DETAILS:(eventId: string) => `/events/${eventId}`
  }
}