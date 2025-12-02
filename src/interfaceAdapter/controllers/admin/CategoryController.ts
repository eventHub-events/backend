import { Response, Request, NextFunction } from "express";
import { ICreateCategoryUseCase } from "../../../application/interface/useCases/admin/category/ICreateCategoryUseCase";
import { IDeleteCategoryUseCase } from "../../../application/interface/useCases/admin/category/IDeleteCategoryUseCase";
import { IEditCategoryUseCase } from "../../../application/interface/useCases/admin/category/IEditCategoryUseCase";
import { IFetchCategoryUseCase } from "../../../application/interface/useCases/admin/category/IFetchCategoryUseCase";
import { HttpStatusCode } from "../../../infrastructure/interface/enums/HttpStatusCode";
import { ApiResponse } from "../../../infrastructure/commonResponseModel/ApiResponse";
import { CustomError } from "../../../infrastructure/errors/errorClass";
import { ErrorMessages } from "../../../constants/errorMessages";
import { ResponseMessages } from "../../../infrastructure/constants/responseMessages";

export  class CategoryController {
   
  constructor(
      private _createCategoryUseCase : ICreateCategoryUseCase,
      private _editCategoryUseCase : IEditCategoryUseCase,
      private _deleteCategoryUseCase : IDeleteCategoryUseCase,
      private _fetchCategoryUseCase : IFetchCategoryUseCase
  ){}
  async create(req: Request , res: Response, next: NextFunction) : Promise <void> {
    try{
            const result = await this._createCategoryUseCase.execute(req.body);
      res.status(HttpStatusCode.CREATED).json(ApiResponse.success(ResponseMessages.CATEGORY.CATEGORY_CREATION_SUCCESS, HttpStatusCode.CREATED,result));
    }catch(err){
      next(err);
    }
    
  }
  async edit(req: Request,  res: Response, next: NextFunction): Promise<void> {

     try{
          const{ categoryId} = req.params;
          if(!categoryId) throw new CustomError(ErrorMessages.CATEGORY.ID_REQUIRED, HttpStatusCode.BAD_REQUEST);
        const updated = await this._editCategoryUseCase.execute( categoryId,req.body);
        res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CATEGORY.CATEGORY_EDIT_SUCCESS , HttpStatusCode.OK, updated));
     }catch(err){
        next(err);
     }
  }
  
  async delete(req: Request, res: Response, next: NextFunction): Promise< void> {
     
    try{
       const{categoryId} = req.params;
            if(!categoryId) throw new CustomError(ErrorMessages.CATEGORY.ID_REQUIRED,HttpStatusCode.BAD_REQUEST);
            const result = await this._deleteCategoryUseCase.execute(categoryId);
          res.status(HttpStatusCode.OK).json(ApiResponse.success(result, HttpStatusCode.OK));

    }catch(err){
      next(err);
    }
  }
  async fetchAllCategory(req: Request, res: Response, next: NextFunction) : Promise<void > {
       try{
            const result = await this._fetchCategoryUseCase.execute();
            res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CATEGORY.CATEGORIES_FETCH_SUCCESS,HttpStatusCode.OK, result));
       }catch(err){
        next(err);
       }
  }
  async fetchCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
       try{ 
           const {categoryId} = req.params;
            if(!categoryId) throw new CustomError(ErrorMessages.CATEGORY.ID_REQUIRED,HttpStatusCode.BAD_REQUEST);
            const category = await this._fetchCategoryUseCase.execute(categoryId);

            res.status(HttpStatusCode.OK).json(ApiResponse.success(ResponseMessages.CATEGORY.CATEGORY_FETCH_SUCCESS, HttpStatusCode.OK, category));


       }catch(err){
         next(err);
       }
  }
}