import { Request, Response, NextFunction } from 'express';
import { IMiddlewareInterface } from '../interfaces/MiddlewareInterface';

export default class CarsMiddleware implements IMiddlewareInterface {
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

  private checkDoorsQty = (req: Request, res: Response, next: NextFunction) => {
    const { doorsQty } = req.body;

    if (typeof doorsQty !== 'number') {
      const message = '"doorsQty" should be a number';
      return res.status(400).json({ message });
    }

    if (doorsQty < 2) {
      return res.status(400).json({ message: '"doorsQty" should be >= 2' });
    }

    next();
  };

  private checkSeatsQty = (req: Request, res: Response, next: NextFunction) => {
    const { seatsQty } = req.body;

    if (typeof seatsQty !== 'number') {
      const message = '"seatsQty" should be a number';
      return res.status(400).json({ message });
    }

    if (seatsQty < 2) {
      return res.status(400).json({ message: '"seatsQty" should be >= 2' });
    }

    next();
  };

  public create = [
    this.checkModel,
    this.checkYear,
    this.checkColor,
    this.checkStatus,
    this.checkBuyValue,
    this.checkDoorsQty,
    this.checkSeatsQty,
  ];
}