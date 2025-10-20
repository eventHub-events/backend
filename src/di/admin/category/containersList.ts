import { CategoryMapper } from "../../../application/mapper/admin/CategoryMapper";
import { CreateCategoryUseCase } from "../../../application/useCases/admin/category/createCategoryUseCase";
import { DeleteCategoryUseCase } from "../../../application/useCases/admin/category/deleteCategoryUseCase";
import { EditCategoryUseCase } from "../../../application/useCases/admin/category/editCategoryUseCase";
import { FetchCategoryUseCase } from "../../../application/useCases/admin/category/fetchCategoryUseCase";
import { CategoryEntityFactory } from "../../../infrastructure/factories/admin/CategoryEntityFactory";
import { CategoryRepository } from "../../../infrastructure/repositories/admin/CategoryRepository";
import { CategoryController } from "../../../interfaceAdapter/controllers/admin/CategoryController";

 const categoryEntityFactory    = new CategoryEntityFactory();
 const categoryRepository       = new CategoryRepository(categoryEntityFactory);
 const categoryMapper           = new CategoryMapper();
 const createCategoryUseCase    = new CreateCategoryUseCase(categoryRepository, categoryMapper);
 const editCategoryUseCase      = new EditCategoryUseCase(categoryRepository, categoryMapper);
 const deleteCategoryUseCase    = new DeleteCategoryUseCase(categoryRepository);
 const fetchCategoryUseCase     = new FetchCategoryUseCase(categoryRepository, categoryMapper);
export const categoryController = new CategoryController(createCategoryUseCase, editCategoryUseCase, deleteCategoryUseCase, fetchCategoryUseCase);