
import { CategoryResponseDTO } from "../../../../domain/dtos/admin/category/CategoryResponseDTO";
import { CreateCategoryRequestDTO } from "../../../../domain/dtos/admin/category/CreateCategoryRequestDTO";

export interface ICreateCategoryUseCase {
  execute(data: CreateCategoryRequestDTO): Promise<CategoryResponseDTO>
}