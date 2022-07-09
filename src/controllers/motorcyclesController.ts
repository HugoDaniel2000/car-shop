import { NextFunction, Request, Response } from 'express';
import Controller, { RequestWithBody } from './genericController';
import MotorcycleService from '../services/motorcyclesService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(service = new MotorcycleService(), route = '/Motorcycles') {
    super(service);
    this.$route = route;
    this.readOne = this.readOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  get route() {
    return this.$route;
  }

  async create(
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    const { body } = req;

    try {
      const result = (await this.service.create(body)) as Motorcycle;
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async readOne(
    req: Request<{ id: string }>,
    res: Response<Motorcycle | null>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    const { id } = req.params;
    try {
      const result = (await this.service.readOne(id)) as Motorcycle | null;
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<{ id: string }>,
    res: Response<Motorcycle[] | null>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = (await this.service
        .update(id, body)) as Motorcycle[] | null;
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response<Motorcycle | null>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    try {
      const { id } = req.params;
      const result = (await this.service.delete(id)) as Motorcycle | null;
      return res.status(204).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;
