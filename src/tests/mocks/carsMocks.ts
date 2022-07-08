import { Types } from 'mongoose';

export const validCar = {
  _id: new Types.ObjectId(),
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const validCar2 = {
  _id: 999,
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const updateCar = {
  model: 'Uno da Escada',
  year: 1966,
  color: 'blue',
  buyValue: 3500,
};

export const updatedCar = {
  _id: '999',
  model: 'Uno da Escada',
  year: 1966,
  color: 'blue',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const coverageCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const noModelCar = {
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const noYearCar = {
  model: 'Uno da Escada',
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}

export const noColorCar = {
  model: 'Uno da Escada',
  year: 1963,
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}

export const noBuyValueCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  seatsQty: 2,
  doorsQty: 2
}

export const noSeatsCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  doorsQty: 2
}

export const noDoorsCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
}

export const carSeatsLtTwo = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 1,
  doorsQty: 2
}

export const carDoorsLtTwo = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 1
}