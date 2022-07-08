import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import mongoose from 'mongoose';

import CarModel from '../../../models/carsModel';
import { updateCar, updatedCar, validCar, validCar2 } from '../../mocks/carsMocks';
import { Car } from '../../../interfaces/CarInterface';


describe('Cars Model', () =>{

  const model = new CarModel();

  let sinonStub: SinonStub;

  describe('Create cars', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model, 'create').resolves(validCar)
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Shoul return created car', async () => {
      const result = await model.create({} as Car);
      expect(result).to.be.eql(validCar)
    })
  })

  describe('Find cars by id', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model, 'findOne').resolves(validCar2)
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Should return the car belonging to the requested id', async () => {
      const result = await model.readOne('999');
      expect(result).to.be.eql(validCar2)
    })
  })

  describe('Find all cars', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model, 'find').resolves([])
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Should return all cars', async () => {
      const result = await model.read();
      expect(result).to.be.an("array");
    })
  })

  describe('Update car by id', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model,'findOneAndUpdate').resolves(updatedCar);
    })
    afterEach(() => {
      sinonStub.restore();
    })
    it('Should return updated car', async () => {
      const result = await model.update('999999999999999999999999', updateCar as Car );
      expect(result).to.be.eql(updatedCar);
    })
  })

  describe('Delete car by id', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model,'findOneAndDelete').resolves(validCar2)

    })
    afterEach(() => {
      sinonStub.restore();
    })
    it('Should return null', async () => {
      const result = await model.delete('999999999999999999999999');
      expect(result).to.be.eql(validCar2);
    })
  })

} )