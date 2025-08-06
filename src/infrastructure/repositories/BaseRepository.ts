import {
  Model, Document, FilterQuery, UpdateQuery,
} from 'mongoose';

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
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id:string):Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
