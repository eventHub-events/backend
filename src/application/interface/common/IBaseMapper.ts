

export interface IBaseMapper<Entity, RequestDTO, ResponseDTO, UpdateDTO = Partial<Entity>> {
   toEntity(dto: RequestDTO) :  Entity;
   toResponseDTO (entity: Entity):  ResponseDTO;
   toEntityForUpdate(dto: UpdateDTO): Partial<Entity>
}