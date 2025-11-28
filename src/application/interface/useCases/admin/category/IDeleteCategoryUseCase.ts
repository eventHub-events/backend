import { DeleteCategoryRequestDTO } from "../../../../DTOs/admin/category/DeleteCategoryReqDTO";

export interface IDeleteCategoryUseCase {
  execute(categoryId: string): Promise< string>
}