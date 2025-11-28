
import { CategoryResponseDTO } from "../../../../DTOs/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../../DTOs/admin/category/CreateCategoryRequestDTO";

export interface ICreateCategoryUseCase {
  execute(data: CreateCategoryRequestDTO): Promise<CategoryResponseDTO>
}