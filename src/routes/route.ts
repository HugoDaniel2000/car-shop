import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../controllers/genericController';
import { IMiddlewareInterface } from '../interfaces/MiddlewareInterface';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    middleware: IMiddlewareInterface,
    route: string = controller.route,
  ) {
    this.router.get(route, (req, res, next) => controller.read(req, res, next));
    this.router.get(
      `${route}/:id`,

      (req, res, next) => controller.readOne(req, res, next),
    );
    this.router.post(
      route,
      middleware.create,
      (
        req: Request,
        res: Response,
        next: NextFunction,
      ) => controller.create(req, res, next),
    );
  }
}
