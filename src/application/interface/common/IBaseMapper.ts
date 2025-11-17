

export interface IBaseMapper<Entity, RequestDTO, ResponseDTO> {
   toEntity(dto: RequestDTO) :  Entity;
   toResponseDTO (entity: Entity):  ResponseDTO;
  
}