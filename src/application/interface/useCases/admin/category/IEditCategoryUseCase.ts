import { CategoryEditRequestDTO } from "../../../../../domain/DTOs/admin/category/CategoryEditRequestDTO";
import { CategoryResponseDTO } from "../../../../../domain/DTOs/admin/category/CategoryResponseDTO";

export interface IEditCategoryUseCase {
  execute(categoryId: string, data: CategoryEditRequestDTO) : Promise<CategoryResponseDTO>
}