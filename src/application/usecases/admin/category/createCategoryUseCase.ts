import { CategoryResponseDTO } from "../../../../domain/dtos/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../../domain/dtos/admin/category/CreateCategoryRequestDTO";
import { ICategoryRepository } from "../../../../domain/repositories/admin/ICategoryRepository";
import { ICreateCategoryUseCase } from "../../../interface/admin/category/ICreateCategoryUseCase";
import { ICategoryMapper } from "../../../interface/mapper/admin/ICategoryMapper";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
       private _categoryRepo : ICategoryRepository,
       private _categoryMapper: ICategoryMapper
  ){}
 async  execute(data: CreateCategoryRequestDTO): Promise<CategoryResponseDTO> {
        const categoryEntity = this._categoryMapper.toEntityForCreation(data)
      const result = await this._categoryRepo.createCategory(categoryEntity)
      return this._categoryMapper.toResponseDTO(result)
  }
}