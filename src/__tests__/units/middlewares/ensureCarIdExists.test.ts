import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../database";
import { Car } from "../../../interfaces";
import { ensure } from "../../../middlewares/ensure.middleware";
import { AppError } from "../../../errors";

describe("Unit test: Params Id Exists middleware", () => {
  const carTb = prisma.car;
  let car: Car;

  let req: Partial<Request> = {};
  let res: Partial<Response> = {};
  let next: NextFunction = jest.fn();

  const carMock = {
    name: "Car name",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  };

  beforeEach(async () => {
    next = jest.fn();
    await carTb.deleteMany();
    car = await carTb.create({ data: carMock });
  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should found database resource.", async () => {
    req.params = { id: car.id.toString() };
    await ensure.carIdExists(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.locals).toHaveProperty("foundCar");
  });

  test("Should throw an error when trying to find invalid user id.", () => {
    req.params = { id: "999" };
    const ensureCar = ensure.carIdExists;

    expect(async () => {
      await ensureCar(req as Request, res as Response, next);
    }).rejects.toThrow(AppError);
    expect(next).not.toHaveBeenCalled()
  });
});