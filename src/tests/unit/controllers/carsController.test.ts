import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { NextFunction, Request, Response } from 'express';
import CarService from '../../../services/carsService';
import { validCar } from '../../mocks/carsMocks';
import { SinonStub } from 'sinon';
import CarController from '../../../controllers/carsController';


chai.use(chaiHttp);

const { expect } = chai;

describe('Cars Controller', () => {
  let controller = new CarController();
  let sinonStub: SinonStub;
  let req: Request ;
  let res: Response;
  let next: NextFunction


  describe('create', () => {
    let createStub: SinonStub
    before(async () => {
      res = {} as Response
      req = {} as Request
      next = sinon.stub() as unknown as NextFunction
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      createStub = sinon.stub(CarService.prototype, 'create');
    });

    after(()=>{
      createStub.restore();
    })

    it('Should return 201', async () => {
      createStub.resolves(validCar)
      await controller.create(req, res, next);
      expect((res.status as SinonStub).calledWith(201)).to.be.equal(true)
      expect((res.json as SinonStub).calledWith(validCar)).to.be.equal(true)
    });

    it('Should called nextFunction', async () => {
      createStub.throws()
      await controller.create(req, res, next);
      expect((next as SinonStub).called).to.be.equal(true)
    });
  })

  describe('readOne', () => {
    let readOne: SinonStub
    let req2: Request<{ id: string }>
    before(async () => {
      res = {} as Response
      req2 = {} as Request<{ id: string }>,
      next = sinon.stub() as unknown as NextFunction
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      readOne = sinon.stub(CarService.prototype, 'readOne');
    });

    after(()=>{
      readOne.restore();
    })

    it('Should return 200', async () => {
      readOne.resolves(validCar)
      req2.params = {id: "3"}
      await controller.readOne(req2, res, next);
      expect((res.status as SinonStub).calledWith(200)).to.be.equal(true)
      expect((res.json as SinonStub).calledWith(validCar)).to.be.equal(true)
    });

    it('Should called nextFunction', async () =>{
      readOne.throws()
      req2.params = {id: "3"}
      await controller.readOne(req2, res, next);
      expect((next as SinonStub).called).to.be.equal(true)
    });
  })

  describe('read', () => {
    let readOne: SinonStub
    before(async () => {
      res = {} as Response
      req = {} as Request,
      next = sinon.stub() as unknown as NextFunction
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      readOne = sinon.stub(CarService.prototype, 'read');
    });

    after(()=>{
      readOne.restore();
    })

    it('Should return 200', async () => {
      readOne.resolves([])
      await controller.read(req, res, next);
      expect((res.status as SinonStub).calledWith(200)).to.be.equal(true)
      expect((res.json as SinonStub).calledWith([])).to.be.equal(true)
    });

    it('Should called nextFunction', async () =>{
      readOne.throws()
      await controller.read(req, res, next);
      expect((next as SinonStub).called).to.be.equal(true)
    });
  })

  describe('update', () => {
    let readOne: SinonStub
    let req2: Request<{ id: string }>
    before(async () => {
      res = {} as Response
      req2 = {} as Request<{ id: string }>,
      next = sinon.stub() as unknown as NextFunction
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      readOne = sinon.stub(CarService.prototype, 'update');
    });

    after(()=>{
      readOne.restore();
    })

    it('Should return 200', async () => {
      readOne.resolves(validCar)
      req2.params = {id: "3"}
      await controller.update(req2, res, next);
      expect((res.status as SinonStub).calledWith(200)).to.be.equal(true)
      expect((res.json as SinonStub).calledWith(validCar)).to.be.equal(true)
    });

    it('Should called nextFunction', async () =>{
      readOne.throws()
      req2.params = {id: "3"}
      await controller.update (req2, res, next);
      expect((next as SinonStub).called).to.be.equal(true)
    });
  })

  describe('delete', () => {
    let readOne: SinonStub
    let req2: Request<{ id: string }>
    before(async () => {
      res = {} as Response
      req2 = {} as Request<{ id: string }>,
      next = sinon.stub() as unknown as NextFunction
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      readOne = sinon.stub(CarService.prototype, 'delete');
    });

    after(()=>{
      readOne.restore();
    })

    it('Should return 204', async () => {
      readOne.resolves(validCar)
      req2.params = {id: "3"}
      await controller.delete(req2, res, next);
      expect((res.status as SinonStub).calledWith(204)).to.be.equal(true)
      expect((res.json as SinonStub).calledWith(validCar)).to.be.equal(true)
    });

    it('Should called nextFunction', async () =>{
      readOne.throws()
      req2.params = {id: "3"}
      await controller.delete (req2, res, next);
      expect((next as SinonStub).called).to.be.equal(true)
    });
  })

  describe('test route', () => {
    it('should to be "/cars', () => {
      expect(controller.route).to.be.eql('/cars')
    })
  })

});