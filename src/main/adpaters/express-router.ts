import { Request, Response } from 'express';
import { Controller } from '../../controllers/contracts';

export const adptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.handle(req);

    res.status(response.statusCode).json(response.data);
  };
};
