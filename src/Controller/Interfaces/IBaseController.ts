import { Request, Response} from 'express';

export interface IBaseController<T> {
    ListAll(res: Response): void;
    ListByID(req: Request, id: number): void;
    Insert(req: Request, model: T): void;
    Update(req: Request, id: number, model: T): void;
    Delete(req: Request, id: number): void;
}