import { CategoryResponseDTO } from "../../../domain/dtos/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../domain/dtos/admin/category/CreateCategoryRequestDTO";
import { CategoryEntity } from "../../../domain/entities/admin/Category";
import { categoryDbModel } from "../../../domain/types/AdminDbTypes";
import { ICategoryMapper } from "../../interface/mapper/admin/ICategoryMapper";

export class  CategoryMapper implements ICategoryMapper {
  toResponseDTO(categoryEntity: CategoryEntity): CategoryResponseDTO {
      return {
        name:  categoryEntity.name,
        color: categoryEntity.color,
        tags: categoryEntity.tags,
          id: categoryEntity.id,
  description :categoryEntity.description,
  isBlocked: categoryEntity.isBlocked,
  createdAt: categoryEntity.createdAt

      }
  }
  toResponseDTOList(categoryEntityList: CategoryEntity[]): CategoryResponseDTO[] {
      return  categoryEntityList.map((doc) => this.toResponseDTO(doc))
  }
  toEntityForCreation(dto : CreateCategoryRequestDTO): CategoryEntity {
     return new CategoryEntity(
        dto.name,
        dto.color,
        dto.tags,
        dto.description

     )
  }
}