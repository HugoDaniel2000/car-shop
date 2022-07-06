import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  async create(obj: T): Promise<T> {
    return this.model.create(obj);
  }

  async read(): Promise<T[]> {
    return this.model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    return this.model.findOne({ _id });
  }

  async update(_id: string, object: T): Promise<T | null> {
    await this.model.updateOne({ _id }, { $set: object });
    return this.model.findOne({ _id });
  }

  async delete(_id: string): Promise<T | null> {
    await this.model.deleteOne({ _id });
    return this.model.findOne({ _id });
  }
}

export default MongoModel;
