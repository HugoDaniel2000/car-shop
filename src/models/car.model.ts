import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './mongo.model';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: { type: Boolean, required: false },
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;