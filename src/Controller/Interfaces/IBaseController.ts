import { Request, Response} from 'express';

export interface IBaseController {

    ListAll(req: Request, res: Response): void;
    ListByID(req: Request, res: Response): void;
    Insert(req: Request, res: Response): void;
    Update(req: Request, res: Response): void;
    Delete(req: Request, res: Response): void;
    routes(): void;

}