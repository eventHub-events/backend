import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.model.findOne(filter, projection).exec();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }
  async updateMany(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: Record<string, unknown>
  ): Promise<{ matchedCount: number; modifiedCount: number }> {
    const result = await this.model.updateMany(filter, data, options).exec();
    return {
      matchedCount: result.matchedCount ?? 0,
      modifiedCount: result.modifiedCount ?? 0,
    };
  }
  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    return result;
  }
  async findOneWithPopulate<P>(
    filter: FilterQuery<T>,
    populateFields: string[]
  ): Promise<(T & P) | null> {
    let query = this.model.findOne(filter);
    for (const field of populateFields) {
      query = query.populate({
        path: field,
        // select: "name email phone isVerified kycStatus"
      });
    }
    const result = await query.exec();
    return result as (T & P) | null;
  }
  async paginate(
    filter: FilterQuery<T> = {},
    page: number = 1,
    limit: number = 5
  ): Promise<{ data: T[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      this.model.countDocuments(filter),
    ]);

    return { data, total };
  }
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
  async findOneAndUpdate(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: Record<string, unknown>
  ): Promise<T | null> {
    const result = await this.model
      .findOneAndUpdate(filter, data, { new: true, ...options })
      .exec();
    return result;
  }
  async updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: Record<string, unknown>
  ): Promise<{ matchedCount: number; modifiedCount: number }> {
    const result = await this.model.updateOne(filter, data, options).exec();
    return {
      matchedCount: result.matchedCount ?? 0,
      modifiedCount: result.modifiedCount ?? 0,
    };
  }
}
