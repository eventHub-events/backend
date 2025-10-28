import { BookingRequestDTO } from "../../../../domain/DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../../../domain/DTOs/user/booking/BookingResponseDTO";
import { BookingEntity } from "../../../../domain/entities/user/BookingEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface IBookingMapper extends IBaseMapper<BookingEntity, BookingRequestDTO, BookingResponseDTO>{}

