import { prisma } from "../../../database";
import { Car } from "../../../interfaces";
import { carService } from "../../../services";

describe("Unit test: carService create", () => {
  const carTb = prisma.car;
  const service = new carService();

  const carMock = {
    name: "Car name",
    brand: "Car brand",
    year: 2023,
    km: 10000,
  };

  const fullCarMock = {
    name: "Car name",
    brand: "Car brand",
    description: "Car description",
    year: 2023,
    km: 10000,
  };

  beforeEach(async () => {
    await carTb.deleteMany();
  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should create a car.", async () => {
    const data = await service.create(carMock);

    expect(data.id).toBeDefined();
    expect(data.name).toBe(carMock.name);
    expect(data.brand).toBe(carMock.brand);
    expect(data.year).toBe(carMock.year);
    expect(data.km).toBe(carMock.km);
  });

  test("Should create a car with description ", async () => {
    const data = await service.create(fullCarMock);

    expect(data.id).toBeDefined();
    expect(data.name).toBe(fullCarMock.name);
    expect(data.brand).toBe(fullCarMock.brand);
    expect(data.description).toBe(fullCarMock.description);
    expect(data.year).toBe(fullCarMock.year);
    expect(data.km).toBe(fullCarMock.km);
  });
});