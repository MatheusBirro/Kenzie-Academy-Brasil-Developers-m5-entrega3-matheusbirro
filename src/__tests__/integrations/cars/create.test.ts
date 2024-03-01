import { prisma } from "../../../database";
import { request } from "../../utils";

describe("Integration Tests: Create Cars route.", () => {
  const baseUrl = "/cars";
  const carTb = prisma.car;

  const carMock = {
    name: "Car name",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  };

  const fullCar = {
    name: "Car name",
    description: "Car description",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  };

  beforeEach(async () => {
    await carTb.deleteMany();
  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should be able to create a car.", async () => {
    const response = await request.post(baseUrl).send(carMock);

    const expectedValue = {
      id: expect.any(String),
      name: carMock.name,
      description: null,
      brand: carMock.brand,
      year: carMock.year,
      km: carMock.km,
    };

    expect(response.body).toStrictEqual(expectedValue);
    expect(response.status).toBe(201);
  });

  test("Should be able to create a car with description.", async () => {
    const response = await request.post(baseUrl).send(fullCar);

    const expectedValue = {
      id: expect.any(String),
      name: fullCar.name,
      description: fullCar.description,
      brand: fullCar.brand,
      year: fullCar.year,
      km: fullCar.km,
    };

    expect(response.body).toStrictEqual(expectedValue);
    expect(response.status).toBe(201);
  });

  test("Shouldn't be able to create a car - invalid body.", async () => {
    const response = await request.post(baseUrl).send({});

    const expectedValue = {
      message: [
        {
          code: "invalid_type",
          expected: "string",
          message: "Required",
          path: ["name"],
          received: "undefined",
        },
        {
          code: "invalid_type",
          expected: "string",
          message: "Required",
          path: ["brand"],
          received: "undefined",
        },
        {
          code: "invalid_type",
          expected: "number",
          message: "Required",
          path: ["year"],
          received: "undefined",
        },
        {
          code: "invalid_type",
          expected: "number",
          message: "Required",
          path: ["km"],
          received: "undefined",
        },
      ],
    };

    expect(response.body).toStrictEqual(expectedValue);
    expect(response.status).toBe(400);
  });
});
