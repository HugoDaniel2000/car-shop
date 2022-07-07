import { ZodError } from 'zod';
import CustomError from '../../helpers/customErrors';
import Model from '../models/mongoModel';

export interface ServiceError {
  error: ZodError;
}
abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<T | null | ServiceError> {
    if (_id.length < 24) {
      throw new CustomError(400, 'Id must have 24 hexadecimal characters');
    }
    const result = await this.model.readOne(_id);
    if (!result) {
      throw new CustomError(404, 'Object not found');
    }
    return result;
  }

  public async update(_id: string, object: T): Promise<T | null> {
    return this.model.update(_id, object);
  }

  public async delete(_id: string): Promise<T | null | ServiceError> {
    return this.model.delete(_id);
  }
}

export default Service;