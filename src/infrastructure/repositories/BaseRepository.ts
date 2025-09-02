import  {
  Model, Document, FilterQuery, UpdateQuery,
} from 'mongoose';
import { IUserDocument } from '../db/models/UserModel';

export class BaseRepository< T extends Document > {
  constructor(private model:Model<T>) {}

  async create(data :Partial<T>):Promise<T> {
    return this.model.create(data);
  }

  async findById(id:string):Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter :FilterQuery<T>):Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findAll(filter:FilterQuery<T> = {}):Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async update(id:string, data:UpdateQuery<T>):Promise<T | null> {
     
         const result=await this.model.findByIdAndUpdate(id,data,{new:true}).exec();
        
         return result
       
  }  async findOneWithPopulate<P>(
    filter: FilterQuery<T>, 
    populateFields: string[]
  ): Promise<(T & P) | null> {
    let query = this.model.findOne(filter);
    for (const field of populateFields) {
      query = query.populate({
        path:field,
        select: "name email phone"
      });
    }
    const result = await query.exec();
    return result as (T & P) | null; 
  }
  async delete(id:string):Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
  async findOneAndUpdate(filter: FilterQuery<T>,data:UpdateQuery<T>):Promise<T |null>{
    const result= await this.model.findOneAndUpdate(filter,data,{new :true}).exec()
    return result
  }
}
