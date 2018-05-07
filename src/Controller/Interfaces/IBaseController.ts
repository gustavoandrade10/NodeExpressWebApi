import { Request, Response} from 'express';

export interface IBaseController {

    listAll(req: Request, res: Response): void;

    listByID(req: Request, res: Response): void;

    insert(req: Request, res: Response): void;

    update(req: Request, res: Response): void;

    delete(req: Request, res: Response): void;

    routes(): void;

}