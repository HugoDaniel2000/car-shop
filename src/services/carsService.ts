import { Car } from '../interfaces/CarInterface';
import Service from './genericService';
import CarModel from '../models/carsModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }
}

export default CarService;