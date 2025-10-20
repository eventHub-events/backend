import { CategoryResponseDTO } from "../../../../domain/DTOs/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../../domain/DTOs/admin/category/CreateCategoryRequestDTO";
import { UpdateCategoryRequestDTO } from "../../../../domain/DTOs/admin/category/UpdateCategoryRequestDTO";
import { CategoryEntity } from "../../../../domain/entities/admin/Category";


export interface ICategoryMapper {
  toResponseDTO(categoryEntity: CategoryEntity) : CategoryResponseDTO;
  toResponseDTOList( categoryEntityList: CategoryEntity[]): CategoryResponseDTO[];
  toEntityForCreation(dto : CreateCategoryRequestDTO): CategoryEntity;
  toEntityForUpdate(dto: UpdateCategoryRequestDTO): Partial<CategoryEntity>;
}