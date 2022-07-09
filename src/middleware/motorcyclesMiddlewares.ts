import { Request, Response, NextFunction } from 'express';
import { IMiddlewareInterface } from '../interfaces/MiddlewareInterface';

export default class MotocylesMiddleware implements IMiddlewareInterface {
  private checkModel = (req: Request, res: Response, next: NextFunction) => {
    const { model } = req.body;

    if (typeof model !== 'string') {
      return res.status(400).json({ message: '"model" should be a string' });
    }

    next();
  };

  private checkYear = (req: Request, res: Response, next: NextFunction) => {
    const { year } = req.body;

    if (typeof year !== 'number') {
      return res.status(400).json({ message: '"year" should be a number' });
    }

    next();
  };

  private checkColor = (req: Request, res: Response, next: NextFunction) => {
    const { color } = req.body;

    if (typeof color !== 'string') {
      return res.status(400).json({ message: '"color" should be a string' });
    }

    next();
  };

  private checkStatus = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    if (![undefined, true, false].includes(status)) {
      const message = '"status" should be boolean or undefined';
      return res.status(400).json({ message });
    }

    next();
  };

  private checkBuyValue = (req: Request, res: Response, next: NextFunction) => {
    const { buyValue } = req.body;

    if (typeof buyValue !== 'number') {
      return res.status(400).json({ message: '"buyValue" should be a number' });
    }

    next();
  };

  private category = (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.body;

    if (typeof category !== 'string') {
      const message = '"category" should be a string';
      return res.status(400).json({ message });
    }

    if (
      category !== 'Street'
      && category !== 'Custom'
      && category !== 'Trail'
    ) {
      const message = '"category" should be equal Street, Custom or Trail';
      return res.status(400).json({ message });
    }

    next();
  };

  private engineCapacity = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { engineCapacity } = req.body;

    if (typeof engineCapacity !== 'number') {
      const message = '"engineCapacity" should be a number';
      return res.status(400).json({ message });
    }

    if (engineCapacity < 1 || engineCapacity > 2500) {
      return res
        .status(400)
        .json({ message: '"engineCapacity" should be >= 1 or <= 2500' });
    }

    next();
  };

  public create = [
    this.checkModel,
    this.checkYear,
    this.checkColor,
    this.checkStatus,
    this.checkBuyValue,
    this.category,
    this.engineCapacity,
  ];
}
