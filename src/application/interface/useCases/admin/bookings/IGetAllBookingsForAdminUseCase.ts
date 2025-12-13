import { BookingResponseDTOForAdmin } from '../../../../DTOs/admin/bookings/BookingResponseDTOForAdmin';
import { BookingFilterForAdminDTO } from '../../../../DTOs/admin/bookings/BookingsFilterForAdminDTO';

export interface IGetAllBookingsForAdminUseCase {
  execute(filter: BookingFilterForAdminDTO): Promise<{
    mappedBookings: BookingResponseDTOForAdmin[];
    totalPages: number;
  }>;
}
