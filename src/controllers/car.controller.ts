import { Request, Response } from "express";
import { carService } from "../services";

export class CarController{
    private carService= new carService();

    public create = async (
        { body }: Request,
        res: Response
      ): Promise<Response> => {
        const newCar = await this.carService.create(body);
        return res.status(201).json(newCar);
      };

      public read = async (
        req: Request,
        res: Response
      ): Promise<Response> => {
        const car = await this.carService.read(req.params.id);
        return res.status(200).json(car);
      };
      
      public update = async (
        req: Request,
        res: Response
      ): Promise<Response> => {
        const user = await this.carService.update(req.params.id, req.body);
        return res.status(200).json(user);
      };

      public delete = async (
        req: Request,
        res: Response
      ): Promise<Response> => {
        await this.carService.delete(req.params.id);
        return res.status(204).json();
      };

}