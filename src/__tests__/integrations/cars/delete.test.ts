import { prisma } from "../../../database";
import { request } from "../../utils";

describe("Integration Tests: Delete Cars route.", () => {
  const baseUrl = "/cars/";
  const carTb = prisma.car;

  const carMock = {
    name: "Car name",
    brand: "Card brand",
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

  test("Should be able to delete a car.", async () => {
    const car = await carTb.create({ data: carMock });

    await request.delete(`${baseUrl}${car.id}`).expect(204);
  });

  test("Should throw error when car id is invalid.", async () => {
    const response = await request.delete(`${baseUrl}${invalidId}`);

    const expectedValue = { message: "Car not found"}

    expect(response.body).toStrictEqual(expectedValue);
    expect(response.status).toBe(404);
  });
});
