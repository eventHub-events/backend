

export interface IDeleteCategoryUseCase {
  execute(categoryId: string): Promise< string>
}