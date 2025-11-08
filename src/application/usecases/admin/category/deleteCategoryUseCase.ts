import { DeleteCategoryRequestDTO } from "../../../DTOs/admin/category/DeleteCategoryReqDTO";
import { ICategoryRepository } from "../../../../domain/repositories/admin/ICategoryRepository";
import { IDeleteCategoryUseCase } from "../../../interface/useCases/admin/category/IDeleteCategoryUseCase";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {

  constructor(
      private _categoryRepo: ICategoryRepository
  ){}
 async  execute(categoryId: string): Promise<string> {
    
      await this._categoryRepo.softDeleteCategory(categoryId);
      return "Category deleted successfully"
  }
}