import { prisma } from "../../../database";
import { request } from "../../utils";

describe("Integration Tests: Update Cars route.", () => {
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

  const invalidId = "762eff5f-9abd-44b4-9cb7-94e53eeb6bcd"

  beforeAll(async () => {
    await carTb.deleteMany();
    await carTb.create({ data: fullCar });
  });

  afterAll(async () => {
    await carTb.deleteMany();
  });

  test("Should be able to update a car by id.", async () => {
    const carUpdated = await carTb.create({ data: carMock });

    const data = await request
       .patch(`/cars/${carUpdated.id}`)
       .send(fullCar)
       .expect(200)
       .then((response) => response.body);

    const updateCar = { ...carUpdated, ...fullCar };

    expect(data).toStrictEqual(updateCar);
  });

  test("should throw error when car is invalid", async () => {
    await request.patch(`/cars/${invalidId}`).expect(404);
 });
});