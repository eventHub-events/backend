import { CategoryResponseDTO } from '../../DTOs/admin/category/CategoryResponseDTO';
import { CreateCategoryRequestDTO } from '../../DTOs/admin/category/CreateCategoryRequestDTO';
import { UpdateCategoryRequestDTO } from '../../DTOs/admin/category/UpdateCategoryRequestDTO';
import { CategoryEntity } from '../../../domain/entities/admin/Category';
import { ICategoryMapper } from '../../interface/mapper/admin/ICategoryMapper';

export class CategoryMapper implements ICategoryMapper {
  toResponseDTO(categoryEntity: CategoryEntity): CategoryResponseDTO {
    return {
      name: categoryEntity.name,
      color: categoryEntity.color,
      tags: categoryEntity.tags,
      id: categoryEntity.id,
      description: categoryEntity.description,
      isBlocked: categoryEntity.isBlocked,
      createdAt: categoryEntity.createdAt,
    };
  }
  toResponseDTOList(
    categoryEntityList: CategoryEntity[]
  ): CategoryResponseDTO[] {
    return categoryEntityList.map(doc => this.toResponseDTO(doc));
  }
  toEntityForCreation(dto: CreateCategoryRequestDTO): CategoryEntity {
    return new CategoryEntity(dto.name, dto.color, dto.tags, dto.description);
  }
  toEntityForUpdate(dto: UpdateCategoryRequestDTO): Partial<CategoryEntity> {
    return {
      name: dto.name,
      color: dto.color,
      tags: dto.tags,
      description: dto.description,
      isBlocked: dto.isBlocked,
    };
  }
}
