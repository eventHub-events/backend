import { CategoryEditRequestDTO } from "../../../../domain/dtos/admin/category/CategoryEditRequestDTO";
import { CategoryResponseDTO } from "../../../../domain/dtos/admin/category/CategoryResponseDTO";

export interface IEditCategoryUseCase {
  execute(categoryId: string, data: CategoryEditRequestDTO) : Promise<CategoryResponseDTO>
}