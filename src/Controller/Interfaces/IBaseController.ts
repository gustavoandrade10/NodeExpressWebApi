import { Request, Response} from 'express';

export interface IBaseController {

    ListAll(res: Response): void;
    ListByID(req: Request, id: number): void;

}