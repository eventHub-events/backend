import { ICategoryEntityFactory } from '../../../application/interface/factories/admin/ICategoryEntityFactory';
import { CategoryEntity } from '../../../domain/entities/admin/Category';
import { categoryDbModel } from '../../../domain/types/AdminDbTypes';

export class CategoryEntityFactory implements ICategoryEntityFactory<
  categoryDbModel,
  CategoryEntity
> {
  toDomain(dbModel: categoryDbModel): CategoryEntity {
    return new CategoryEntity(
      dbModel.name,
      dbModel.color,
      dbModel.tags,
      dbModel.description,
      dbModel.isBlocked,
      dbModel.isDeleted,
      dbModel._id.toString()
    );
  }
  toDomainList(dbModel: categoryDbModel[]): CategoryEntity[] {
    return dbModel.map(category => this.toDomain(category));
  }
}
