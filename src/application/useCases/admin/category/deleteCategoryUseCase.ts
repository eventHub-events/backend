import { ICategoryRepository } from '../../../../domain/repositories/admin/ICategoryRepository';
import { ResponseMessages } from '../../../../infrastructure/constants/responseMessages';
import { IDeleteCategoryUseCase } from '../../../interface/useCases/admin/category/IDeleteCategoryUseCase';

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private _categoryRepo: ICategoryRepository) {}
  async execute(categoryId: string): Promise<string> {
    await this._categoryRepo.softDeleteCategory(categoryId);
    return ResponseMessages.CATEGORY.CATEGORY_DELETE_SUCCESS;
  }
}
