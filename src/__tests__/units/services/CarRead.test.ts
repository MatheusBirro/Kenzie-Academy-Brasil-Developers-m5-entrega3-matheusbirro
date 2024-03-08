import { prisma } from "../../../database";
import { carService } from "../../../services";

describe("Unit test: carService read", () => {
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

  beforeAll(async () => {
    await carTb.deleteMany();
    await carTb.create({ data: carMock });
    await carTb.create({ data: fullCarMock });
  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should read many cars.", async () => {
    const data = await service.read();

    expect(data).toHaveLength(2);
  });

  test("Should read a car by id.", async () => {
    const res = await carTb.create({ data: fullCarMock });

    const data = await service.read(res.id);

    const expectedValue = {
      id: res.id,
      name: fullCarMock.name,
      description: fullCarMock.description,
      brand: fullCarMock.brand,
      year: fullCarMock.year,
      km: fullCarMock.km,
    };

    expect(data).toStrictEqual(expectedValue);
  });
});