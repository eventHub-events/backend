import { CategoryResponseDTO } from "../../../DTOs/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../DTOs/admin/category/CreateCategoryRequestDTO";
import { UpdateCategoryRequestDTO } from "../../../DTOs/admin/category/UpdateCategoryRequestDTO";
import { CategoryEntity } from "../../../../domain/entities/admin/Category";


export interface ICategoryMapper {
  toResponseDTO(categoryEntity: CategoryEntity) : CategoryResponseDTO;
  toResponseDTOList( categoryEntityList: CategoryEntity[]): CategoryResponseDTO[];
  toEntityForCreation(dto : CreateCategoryRequestDTO): CategoryEntity;
  toEntityForUpdate(dto: UpdateCategoryRequestDTO): Partial<CategoryEntity>;
}