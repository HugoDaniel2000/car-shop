import { Request, Response, NextFunction } from 'express';
import CustomError from '../../helpers/customErrors';

const error = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.log(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ message: 'Erro interno' });
};

export default error;