import { prisma } from "../database"
import { CarCreate, CarReturn,  CarUpdate } from "../interfaces"
import { carReturnSchema } from "../schemas"

export class carService {
    public create = async ({description,...payload}: CarCreate): Promise<CarReturn> =>{
        if (description) {
            const newCar = await prisma.car.create({ data: {...payload, description} });
            return carReturnSchema.parse(newCar);
        }
        const newCar = await prisma.car.create({ data: {...payload, description: null} });
        return carReturnSchema.parse(newCar);
    }

    public read = async (carId?: string): Promise<CarReturn[] | CarReturn> =>{
        if (carId) {
            const car = await prisma.car.findFirst({ where: {id: carId} });
            return carReturnSchema.parse(car);
        }

        const allCars = await prisma.car.findMany();
        return carReturnSchema.array().parse(allCars);
    }

    public update = async (carId: string, payload: CarUpdate): Promise<CarReturn> =>{
        const car = await prisma.car.update({
          data: payload as any,
          where: { id: carId }
        });
        return carReturnSchema.parse(car);
    }

    public delete = async ( carId: string): Promise<void> =>{
        await prisma.car.delete({ where: {id: carId} });
    }
}