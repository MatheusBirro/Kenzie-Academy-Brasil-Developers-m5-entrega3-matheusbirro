import { z } from "zod";
import { carCreateSchema, carReturnSchema, carUpdateSchema } from "../schemas";
import { carSchema } from "../schemas/car.schema";

type Car = z.infer<typeof carSchema>
type CarCreate = z.infer<typeof carCreateSchema>
type CarUpdate = z.infer<typeof carUpdateSchema>
type CarReturn = z.infer<typeof carReturnSchema>

export{Car, CarCreate, CarUpdate, CarReturn}