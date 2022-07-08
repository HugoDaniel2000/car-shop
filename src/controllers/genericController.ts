import { NextFunction, Request, Response } from 'express';
import Service from '../services/genericService';

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class Controller<T> {
  abstract route: string;

  constructor(protected service: Service<T>) {
    this.read = this.read.bind(this);
  }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | undefined> ;

  async read(
    _req: Request,
    res: Response<T[]>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    try {
      const objs = await this.service.read();
      return res.status(200).json(objs);
    } catch (err) {
      next(err);
    }
  }

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | undefined>;

  abstract update(
    _req: Request,
    res: Response<T[]>,
    next: NextFunction,
  ): Promise<typeof res | undefined>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | undefined>;
}
export default Controller;