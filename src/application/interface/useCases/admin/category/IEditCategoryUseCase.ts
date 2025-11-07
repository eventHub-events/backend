import { CategoryEditRequestDTO } from "../../../../DTOs/admin/category/CategoryEditRequestDTO";
import { CategoryResponseDTO } from "../../../../DTOs/admin/category/CategoryResponseDTO";

export interface IEditCategoryUseCase {
  execute(categoryId: string, data: CategoryEditRequestDTO) : Promise<CategoryResponseDTO>
}