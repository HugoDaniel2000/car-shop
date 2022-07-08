import { expect, use } from 'chai';
import sinon, { SinonStub } from 'sinon';
import chaiAsPromised from 'chai-as-promised';

import { Car } from '../../../interfaces/CarInterface';
import CarModel from '../../../models/carsModel';
import CarService from '../../../services/carsService';
import {updatedCar, validCar, validCar2 } from '../../mocks/carsMocks';
// import { Mongoose } from 'mongoose';

use(chaiAsPromised);

describe('Cars Services', () =>{

  const service = new CarService();

  let sinonStub: SinonStub;

  describe('Create cars', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(CarModel.prototype,'create').resolves(validCar)
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Shoul return created car', async () => {
      const result = await service.create({} as Car);
      expect(result).to.be.eql(validCar)
    })
  })

  describe('Find cars by Id', () => {
    let readOneStub: SinonStub
    beforeEach(() => {
      readOneStub = sinon.stub(CarModel.prototype,'readOne')
    })
    afterEach(() => {
      readOneStub.restore()
    })
    it('Should return car', async () => {
      readOneStub.resolves(validCar2)
      const result = await service.readOne('99999999999999999999999999999');
      expect(result).to.be.eql(validCar2)
    })
    it('Should return "Objetct not found"', async () => {
      readOneStub.resolves(null)
      const result = service.readOne('99999999999999999999999999999');
      expect(result).to.eventually.throw("Object not Found")
    })

    it('Should return "Id must have 24 hexadecimal characters"', async () => {
      const result = service.readOne('99');
      expect(result).to.eventually.throw("Id must have 24 hexadecimal characters")
    })
  })

  describe('Find all cars', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(CarModel.prototype,'read').resolves([])
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Should return created car', async () => {
      const result = await service.read();
      expect(result).to.be.an("array")
    })
  })

  describe('Update cars by Id', () => {
    let updateStub: SinonStub;
    let readOneStub: SinonStub
    beforeEach(() => {
      updateStub = sinon.stub(CarModel.prototype,'update')
      readOneStub =  sinon.stub(service, 'readOne')
    })
    afterEach(() => {
      updateStub.restore()
      readOneStub.restore()
    })
    it('Should return car', async () => {
      updateStub.resolves(updatedCar)
      readOneStub.resolves(validCar2)

      const result = await service.update('99999999999999999999999999999', {} as Car);
      expect(result).to.be.eql(updatedCar)
    })

    it('Should return "Objetct not found"', async () => {
      readOneStub.resolves(null)
      const result = service.update('99999999999999999999999999999', {} as Car);
      expect(result).to.eventually.throw("Object not Found")
    })

    it('Should return "Id must have 24 hexadecimal characters"', async () => {
      readOneStub.resolves("")
      const result = service.update('99', {} as Car);
      expect(result).to.eventually.throw("Id must have 24 hexadecimal characters")
    })
  })

  describe('Delete cars by Id', () => {
    let deleteStub: SinonStub;
    let readOneStub: SinonStub
    beforeEach(() => {
      deleteStub = sinon.stub(CarModel.prototype,'delete')
      readOneStub =  sinon.stub(service, 'readOne')
    })
    afterEach(() => {
      deleteStub.restore()
      readOneStub.restore()
    })
    it('Should return car', async () => {
      deleteStub.resolves(updatedCar)
      readOneStub.resolves(validCar2)

      const result = await service.delete('99999999999999999999999999999');
      expect(result).to.be.eql(updatedCar)
    })

    it('Should return "Objetct not found"', async () => {
      readOneStub.resolves(null)
      const result = service.delete('99999999999999999999999999999');
      expect(result).to.eventually.throw("Object not Found")
    })

    it('Should return "Id must have 24 hexadecimal characters"', async () => {
      readOneStub.resolves("")
      const result = service.delete('99');
      expect(result).to.eventually.throw("Id must have 24 hexadecimal characters")
    })
  })
} )