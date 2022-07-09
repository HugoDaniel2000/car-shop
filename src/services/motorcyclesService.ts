import Service from './genericService';
import MotorcycleModel from '../models/motorcyclesModel';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }
}

export default MotorcycleService;