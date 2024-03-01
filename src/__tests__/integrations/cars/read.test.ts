import { prisma } from "../../../database";
import { request } from "../../utils";

describe("Integration Tests: Read Cars route.", () => {
  const baseUrl = "/cars/";
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

  beforeAll(async () => {
    await carTb.deleteMany();
    await carTb.create({ data: carMock });
    await carTb.create({ data: fullCar });
  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should be able to read all cars.", async () => {
    const response = await request.get(baseUrl);

    const expectedValue = [
      {
        id: expect.any(String),
        name: carMock.name,
        description: null,
        brand: carMock.brand,
        year: carMock.year,
        km: carMock.km,
      },
      {
        id: expect.any(String),
        name: fullCar.name,
        description: fullCar.description,
        brand: fullCar.brand,
        year: fullCar.year,
        km: fullCar.km,
      },
    ];

    expect(response.body).toHaveLength(2);
    expect(response.body).toStrictEqual(expectedValue);

    expect(response.status).toEqual(200);
  });

  test("Should be able to get a single task by the id correctly.", async () => {
    const res = await carTb.create({ data: fullCar });
console.log(res.id);

    const response = await request.get(`${baseUrl}${res.id}`);

    const expectedValue = {
      id: res.id,
      name: fullCar.name,
      description: fullCar.description,
      brand: fullCar.brand,
      year: fullCar.year,
      km: fullCar.km,
    };
    
    expect(response.body).toStrictEqual(expectedValue);
    expect(response.status).toBe(200);
  });
});