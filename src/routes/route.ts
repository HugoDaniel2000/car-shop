import { Router } from 'express';
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
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(
      route,
      middleware.create,
      controller.create,
    );
    this.router.put(`${route}/:id`, middleware.update, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}
