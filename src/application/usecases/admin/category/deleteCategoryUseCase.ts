import { DeleteCategoryRequestDTO } from "../../../../domain/DTOs/admin/category/DeleteCategoryReqDTO";
import { ICategoryRepository } from "../../../../domain/repositories/admin/ICategoryRepository";
import { IDeleteCategoryUseCase } from "../../../interface/admin/category/IDeleteCategoryUseCase";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {

  constructor(
      private _categoryRepo: ICategoryRepository
  ){}
 async  execute(categoryId: string): Promise<string> {
    
      await this._categoryRepo.softDeleteCategory(categoryId);
      return "Category deleted successfully"
  }
}