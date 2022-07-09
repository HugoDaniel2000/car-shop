import CustomRouter from './routes/route';
import App from './app';

import CarController from './controllers/carsController';
import MotorcycleController from './controllers/motorcyclesController';

import { Car } from './interfaces/CarInterface';
import CarsMiddleware from './middleware/carsMiddlewares';
import MotocylesMiddleware from './middleware/motorcyclesMiddlewares';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const carsMiddleware = new CarsMiddleware();

const motocycleController = new MotorcycleController();
const motocycleMiddleware = new MotocylesMiddleware();

const carsRouter = new CustomRouter<Car>();
const motocyclesRouter = new CustomRouter<Motorcycle>();

carsRouter.addRoute(carController, carsMiddleware);
motocyclesRouter.addRoute(motocycleController, motocycleMiddleware);

server.addRouter(carsRouter.router);
server.addRouter(motocyclesRouter.router);

export default server;
