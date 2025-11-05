import { BookingRequestDTO } from "../../../../domain/DTOs/user/booking/BookingRequestDTO";
import { BookingResponseDTO } from "../../../../domain/DTOs/user/booking/BookingResponseDTO";
import { UserBookingListResponseDTO } from "../../../../domain/DTOs/user/booking/UserBookingListResponseDTO";
import { BookingEntity } from "../../../../domain/entities/user/BookingEntity";
import { IBaseMapper } from "../../common/IBaseMapper";

export interface IBookingMapper extends IBaseMapper<BookingEntity, BookingRequestDTO, BookingResponseDTO>{
    toResponseDTOList(entity: BookingEntity[]) : BookingResponseDTO[];
    toUserResponseDTO(entity: BookingEntity) : UserBookingListResponseDTO;
    toUserResponseDTOList(entity: BookingEntity[]) : UserBookingListResponseDTO[];
}

