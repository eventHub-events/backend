export interface TrendingEventDisplayResponseDTO {
  id?: string;
  title: string;
  category: string;
  images: string[];
  location: string;
  attendees?: number;
  startDate: string;
  tags?: string[];
  price: number;
  ticketsLeft?: number;
  availability?: number;
  organizer?: string;
  description?: string;
}
