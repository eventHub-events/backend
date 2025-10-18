import { CategoryEntity } from "../../../../domain/entities/admin/Category";
import { ICategoryRepository } from "../../../../domain/repositories/admin/ICategoryRepository";
import { IFetchCategoryUseCase } from "../../../interface/useCases/admin/category/IFetchCategoryUseCase";
import { ICategoryMapper } from "../../../interface/mapper/admin/ICategoryMapper";

export  class FetchCategoryUseCase implements IFetchCategoryUseCase {
   constructor(
        private _categoryRepo: ICategoryRepository,
        private _categoryMapper: ICategoryMapper
   ){}
  async execute(categoryId?: string): Promise<CategoryEntity[]> {

        if(categoryId){
          const fetchedDoc = await this._categoryRepo.fetchCategoryById(categoryId);

           if(!fetchedDoc){
             throw new Error("Category not Found")
           }

           return [this._categoryMapper.toResponseDTO(fetchedDoc)]

        }
        else {
          const fetchedDocs = await this._categoryRepo.fetchAllCategories();
       return this._categoryMapper.toResponseDTOList(fetchedDocs)

        }

  }
}