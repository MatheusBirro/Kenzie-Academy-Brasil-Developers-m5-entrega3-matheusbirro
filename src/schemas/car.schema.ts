import { z } from "zod";
import { baseSchema } from "./base.schema";

export const carSchema = baseSchema.extend({
    name: z.string().min(1),
    description: z.string().nullish(),
    brand: z.string().min(1),
    year: z.number().min(1),
    km: z.number().min(1)   
})

export const carCreateSchema = carSchema.omit({id: true});
export const carReturnSchema = carSchema;
export const carUpdateSchema = carSchema.omit({id: true}).partial();