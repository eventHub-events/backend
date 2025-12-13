import { CategoryEntity } from '../../entities/admin/Category';

export interface ICategoryRepository {
  createCategory(data: CategoryEntity): Promise<CategoryEntity>;
  editCategory(
    categoryId: string,
    data: Partial<CategoryEntity>
  ): Promise<CategoryEntity>;
  softDeleteCategory(categoryId: string): Promise<void>;
  fetchCategoryById(categoryId: string): Promise<CategoryEntity | null>;
  fetchAllCategories(includedDeleted?: boolean): Promise<CategoryEntity[]>;
}
