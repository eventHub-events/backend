import { ICategoryEntityFactory } from '../../../application/interface/factories/admin/ICategoryEntityFactory';
import { ErrorMessages } from '../../../constants/errorMessages';
import { CategoryEntity } from '../../../domain/entities/admin/Category';
import { ICategoryRepository } from '../../../domain/repositories/admin/ICategoryRepository';
import { categoryDbModel } from '../../../domain/types/AdminDbTypes';

import {
  categoryModel,
  ICategoryDocument,
} from '../../db/models/admin/CategoryModel';
import { BaseRepository } from '../BaseRepository';

export class CategoryRepository
  extends BaseRepository<ICategoryDocument>
  implements ICategoryRepository
{
  constructor(
    private _categoryEntityFactory: ICategoryEntityFactory<
      categoryDbModel,
      CategoryEntity
    >
  ) {
    super(categoryModel);
  }
  async createCategory(data: CategoryEntity): Promise<CategoryEntity> {
    const result = (await super.create(data)) as categoryDbModel;

    if (!result) throw new Error( ErrorMessages.CATEGORY.CREATION_FAILED);

    return this._categoryEntityFactory.toDomain(result);
  }
  async editCategory(
    categoryId: string,
    data: Partial<CategoryEntity>
  ): Promise<CategoryEntity> {
    const updatedDoc = (await super.update(
      categoryId,
      data
    )) as categoryDbModel;

    if (!updatedDoc) throw new Error(ErrorMessages.CATEGORY.CATEGORY_EDIT_FAILURE);
    return this._categoryEntityFactory.toDomain(updatedDoc);
  }
  async fetchAllCategories(
    includeDeleted?: boolean
  ): Promise<CategoryEntity[]> {
    const filter = includeDeleted ? {} : { isDeleted: false };
    const categoryDocs = (await super.findAll(filter)) as categoryDbModel[];
    return categoryDocs.length
      ? this._categoryEntityFactory.toDomainList(categoryDocs)
      : [];
  }

  async fetchCategoryById(categoryId: string): Promise<CategoryEntity | null> {
    const categoryDoc = (await super.findById(categoryId)) as categoryDbModel;
    if (!categoryDoc) throw new Error(ErrorMessages.CATEGORY.NOT_FOUND);
    return this._categoryEntityFactory.toDomain(categoryDoc);
  }

  async softDeleteCategory(categoryId: string): Promise<void> {
    const deletedDoc = (await super.update(categoryId, {
      isDeleted: true,
    })) as categoryDbModel;
    if (!deletedDoc) throw new Error(ErrorMessages.CATEGORY.NOT_FOUND);
  }
}
