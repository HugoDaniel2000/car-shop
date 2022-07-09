import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './mongoModel';

interface MotorcycleDocument extends Motorcycle, Document { }

const motorcycleSchema = new Schema<MotorcycleDocument>({
  model: {
    type: String,
    required: true,
    minlength: 3,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2022,
  },
  color: {
    type: String,
    required: true,
    minlength: 3,
  },
  status: {
    type: Boolean,
    required: false,
  },
  buyValue: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  engineCapacity: {
    type: Number,
    required: true,
    max: 2500,
  },
}, { versionKey: false });

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motocycles', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;