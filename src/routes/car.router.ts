import { Router } from "express";
import { ensure } from "../middlewares/ensure.middleware";
import { CarController } from "../controllers/car.controller";
import { carCreateSchema, carUpdateSchema } from "../schemas";

export const carRouter = Router();

const controller = new CarController();

carRouter.post("/", ensure.validBody(carCreateSchema), controller.create );
carRouter.get("/", controller.read);

carRouter.use("/:id", ensure.carIdExists);

carRouter.get("/:id", controller.read);
carRouter.patch("/:id", ensure.validBody(carUpdateSchema), controller.update);
carRouter.delete("/:id", controller.delete);