import { Request, Response, NextFunction } from 'express';

export interface IMiddlewareInterface {
  create: (
    (req: Request, res: Response, next: NextFunction) => (void | Response)
  )[];
}