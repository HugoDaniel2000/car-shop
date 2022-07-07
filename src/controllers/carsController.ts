import { NextFunction, Request, Response } from 'express';
import Controller, { RequestWithBody } from './genericController';
import CarService from '../Services/carsService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  async create(
    req: RequestWithBody<Car>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    const { body } = req;

    try {
      const car = await this.service.create(body) as Car;
      return res.status(201).json(car);
    } catch (err) {
      next();
    }
  }

  async readOne(
    req: Request<{ id: string }>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | undefined> {
    const { id } = req.params;
    console.log(id);
    try {
      const car = await this.service.readOne(id) as Car;
      return res.status(200).json(car);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}

export default CarController;