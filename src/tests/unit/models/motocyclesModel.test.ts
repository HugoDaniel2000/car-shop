import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import mongoose from 'mongoose';

import MotorcycleModel from '../../../models/motorcyclesModel';
import { updateMotorcycle, updatedMotorcycle, validMotorcycle, validMotorcycle2 } from '../../mocks/motocyclesMocks';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';


describe('Motorcycles Model', () =>{

  const model = new MotorcycleModel();

  let sinonStub: SinonStub;

  describe('Create Motorcycles', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model, 'create').resolves(validMotorcycle)
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Shoul return created Motorcycle', async () => {
      const result = await model.create({} as Motorcycle);
      expect(result).to.be.eql(validMotorcycle)
    })
  })

  describe('Find Motorcycles by id', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model, 'findOne').resolves(validMotorcycle2)
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Should return the Motorcycle belonging to the requested id', async () => {
      const result = await model.readOne('999');
      expect(result).to.be.eql(validMotorcycle2)
    })
  })

  describe('Find all Motorcycles', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model, 'find').resolves([])
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Should return all Motorcycles', async () => {
      const result = await model.read();
      expect(result).to.be.an("array");
    })
  })

  describe('Update Motorcycle by id', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model,'findOneAndUpdate').resolves(updatedMotorcycle);
    })
    afterEach(() => {
      sinonStub.restore();
    })
    it('Should return updated Motorcycle', async () => {
      const result = await model.update('999999999999999999999999', updateMotorcycle as Motorcycle );
      expect(result).to.be.eql(updatedMotorcycle);
    })
  })

  describe('Delete Motorcycle by id', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(mongoose.Model,'findOneAndDelete').resolves(validMotorcycle2)

    })
    afterEach(() => {
      sinonStub.restore();
    })
    it('Should return null', async () => {
      const result = await model.delete('999999999999999999999999');
      expect(result).to.be.eql(validMotorcycle2);
    })
  })

} )