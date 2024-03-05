import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database";
import { AppError } from "../errors";

class EnsureMiddleware{
    public validBody = (schema: AnyZodObject) => 
        (req: Request, _:Response, next: NextFunction): void => {
            
            req.body = schema.parse(req.body);
            return next();
    }

    public carIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (req.params.id) {
        
        const foundCar = await prisma.car.findFirst({
          where: { id: req.params.id },
        });
        if (!foundCar) {
          throw new AppError("Car not found", 404);
        }
        res.locals = { ...res.locals, foundCar};

      }
        return next();
    };
}

export const ensure = new EnsureMiddleware();