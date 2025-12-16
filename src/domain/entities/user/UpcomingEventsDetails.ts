export interface UpcomingEventsDetails {
  title?: string;
  eventid?: string;
  description?: string;
  startDate: Date;
  location?: string;
  category: string;
  ticketsLeft: number;
  availability: number;
  organizer: string;
}
