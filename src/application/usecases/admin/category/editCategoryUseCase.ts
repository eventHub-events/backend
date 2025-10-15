import { CategoryEditRequestDTO } from "../../../../domain/dtos/admin/category/CategoryEditRequestDTO";
import { CategoryResponseDTO } from "../../../../domain/dtos/admin/category/CategoryResponseDTO";
import { ICategoryRepository } from "../../../../domain/repositories/admin/ICategoryRepository";
import { IEditCategoryUseCase } from "../../../interface/admin/category/IEditCategoryUseCase";
import { ICategoryMapper } from "../../../interface/mapper/admin/ICategoryMapper";

export class EditCategoryUseCase implements IEditCategoryUseCase {
  constructor(
       private _categoryRepo : ICategoryRepository,
       private _categoryMapper : ICategoryMapper
  ){}
 async execute(categoryId: string, data: CategoryEditRequestDTO): Promise<CategoryResponseDTO> {

      const categoryEntity = this._categoryMapper.toEntityForCreation(data);
      const updatedDoc = await this._categoryRepo.editCategory(categoryId,categoryEntity)
      return this._categoryMapper.toResponseDTO(updatedDoc)
  }
}