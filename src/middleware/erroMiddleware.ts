import { NextFunction, Request, Response } from 'express';
import CustomError from '../../helpers/customErrors';

const error = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ message: 'Erro interno' });
  next();
};

export default error;