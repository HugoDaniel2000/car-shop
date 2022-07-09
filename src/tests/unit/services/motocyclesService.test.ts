import { expect, use } from 'chai';
import sinon, { SinonStub } from 'sinon';
import chaiAsPromised from 'chai-as-promised';

import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleModel from '../../../models/motorcyclesModel';
import MotorcycleService from '../../../services/motorcyclesService';
import {updatedMotorcycle, validMotorcycle, validMotorcycle2 } from '../../mocks/motocyclesMocks';


use(chaiAsPromised);

describe('Motorcycles Services', () =>{

  const service = new MotorcycleService();

  let sinonStub: SinonStub;

  describe('Create Motorcycles', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(MotorcycleModel.prototype,'create').resolves(validMotorcycle as Motorcycle)
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Shoul return created Motorcycle', async () => {
      const result = await service.create({} as Motorcycle);
      expect(result).to.be.eql(validMotorcycle)
    })
  })

  describe('Find Motorcycles by Id', () => {
    let readOneStub: SinonStub
    beforeEach(() => {
      readOneStub = sinon.stub(MotorcycleModel.prototype,'readOne')
    })
    afterEach(() => {
      readOneStub.restore()
    })
    it('Should return Motorcycle', async () => {
      readOneStub.resolves(validMotorcycle2)
      const result = await service.readOne('99999999999999999999999999999');
      expect(result).to.be.eql(validMotorcycle2)
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

  describe('Find all Motorcycles', () => {
    beforeEach(() => {
      sinonStub = sinon.stub(MotorcycleModel.prototype,'read').resolves([])
    })
    afterEach(() => {
      sinonStub.restore()
    })
    it('Should return created Motorcycle', async () => {
      const result = await service.read();
      expect(result).to.be.an("array")
    })
  })

  describe('Update Motorcycles by Id', () => {
    let updateStub: SinonStub;
    let readOneStub: SinonStub
    beforeEach(() => {
      updateStub = sinon.stub(MotorcycleModel.prototype,'update')
      readOneStub =  sinon.stub(service, 'readOne')
    })
    afterEach(() => {
      updateStub.restore()
      readOneStub.restore()
    })
    it('Should return Motorcycle', async () => {
      updateStub.resolves(updatedMotorcycle)
      readOneStub.resolves(validMotorcycle2)

      const result = await service.update('99999999999999999999999999999', {} as Motorcycle);
      expect(result).to.be.eql(updatedMotorcycle)
    })

    it('Should return "Objetct not found"', async () => {
      readOneStub.resolves(null)
      const result = service.update('99999999999999999999999999999', {} as Motorcycle);
      expect(result).to.eventually.throw("Object not Found")
    })

    it('Should return "Id must have 24 hexadecimal characters"', async () => {
      readOneStub.resolves("")
      const result = service.update('99', {} as Motorcycle);
      expect(result).to.eventually.throw("Id must have 24 hexadecimal characters")
    })
  })

  describe('Delete Motorcycles by Id', () => {
    let deleteStub: SinonStub;
    let readOneStub: SinonStub
    beforeEach(() => {
      deleteStub = sinon.stub(MotorcycleModel.prototype,'delete')
      readOneStub =  sinon.stub(service, 'readOne')
    })
    afterEach(() => {
      deleteStub.restore()
      readOneStub.restore()
    })
    it('Should return Motorcycle', async () => {
      deleteStub.resolves(updatedMotorcycle)
      readOneStub.resolves(validMotorcycle2)

      const result = await service.delete('99999999999999999999999999999');
      expect(result).to.be.eql(updatedMotorcycle)
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