import CustomRouter from './routes/route';
import App from './app';

import CarController from './controllers/carsController';

import { Car } from './interfaces/CarInterface';
import CarsMiddleware from './middleware/carsMiddlewares';

const server = new App();

const carController = new CarController();
const carsMiddleware = new CarsMiddleware();

const carsRouter = new CustomRouter<Car>();

carsRouter.addRoute(carController, carsMiddleware);

server.addRouter(carsRouter.router);

export default server;
