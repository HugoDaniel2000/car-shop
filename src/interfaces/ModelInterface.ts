export interface Model<T> {
  create(object: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id:string, object: T): Promise<T | null>;
  delete(_id: string): Promise<T | null>;
}
