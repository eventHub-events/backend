import { DeleteCategoryRequestDTO } from "../../../../domain/dtos/admin/category/DeleteCategoryReqDTO";

export interface IDeleteCategoryUseCase {
  execute(categoryId: string): Promise< string>
}