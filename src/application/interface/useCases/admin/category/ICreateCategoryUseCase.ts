
import { CategoryResponseDTO } from "../../../../../domain/DTOs/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../../../domain/DTOs/admin/category/CreateCategoryRequestDTO";

export interface ICreateCategoryUseCase {
  execute(data: CreateCategoryRequestDTO): Promise<CategoryResponseDTO>
}