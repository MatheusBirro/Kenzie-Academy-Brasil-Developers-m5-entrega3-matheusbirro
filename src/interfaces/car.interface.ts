import { z } from "zod";
import { carCreateSchema, carReturnSchema, carUpdateSchema } from "../schemas";

type CarCreate = z.infer<typeof carCreateSchema>
type CarUpdate = z.infer<typeof carUpdateSchema>
type CarReturn = z.infer<typeof carReturnSchema>

export{CarCreate, CarUpdate, CarReturn}