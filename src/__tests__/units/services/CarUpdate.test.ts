import { prisma } from "../../../database";
import { carService } from "../../../services";

describe("Unit test: carService update", () => {
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

  const invalidId = "762eff5f-9abd-44b4-9cb7-94e53eeb6bcd";

  beforeEach(async () => {
    await carTb.deleteMany();

  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should read many cars.", async () => {
    const res = await carTb.create({ data: carMock });
    const data = await service.update(res.id,fullCarMock);

    expect(data.description).toBe(fullCarMock.description)
  });
});