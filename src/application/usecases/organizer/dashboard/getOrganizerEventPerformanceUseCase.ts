import { IBookingRepository } from "../../../../domain/repositories/user/IBookingRepository";

export class OrganizerEventPerformanceUseCase {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(
    organizerId: string,
    page: number,
    limit: number
  ) {
    return this.bookingRepo.getOrganizerEventPerformanceForTable(
      organizerId,
      page,
      limit
    );
  }
}
