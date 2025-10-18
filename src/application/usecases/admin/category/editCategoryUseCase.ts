import { CategoryEditRequestDTO } from "../../../../domain/DTOs/admin/category/CategoryEditRequestDTO";
import { CategoryResponseDTO } from "../../../../domain/DTOs/admin/category/CategoryResponseDTO";
import { ICategoryRepository } from "../../../../domain/repositories/admin/ICategoryRepository";
import { IEditCategoryUseCase } from "../../../interface/admin/category/IEditCategoryUseCase";
import { ICategoryMapper } from "../../../interface/mapper/admin/ICategoryMapper";

export class EditCategoryUseCase implements IEditCategoryUseCase {
  constructor(
       private _categoryRepo : ICategoryRepository,
       private _categoryMapper : ICategoryMapper
  ){}
 async execute(categoryId: string, data: CategoryEditRequestDTO): Promise<CategoryResponseDTO> {
       console.log("data ", data)
      const categoryEntity = this._categoryMapper.toEntityForUpdate(data);
      console.log("caca", categoryEntity)
      const updatedDoc = await this._categoryRepo.editCategory(categoryId,categoryEntity)
      return this._categoryMapper.toResponseDTO(updatedDoc)
  }
}