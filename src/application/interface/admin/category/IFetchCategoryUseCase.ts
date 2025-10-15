import { CategoryEntity } from "../../../../domain/entities/admin/Category";

export interface IFetchCategoryUseCase  {
  execute(categoryId: string) : Promise< CategoryEntity[]> ;
}