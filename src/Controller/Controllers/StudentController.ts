import { Request, Response, Router } from 'express';
import { IBaseController } from '../Interfaces/IBaseController';
import { StudentBusiness } from '../../Business/Rules/StudentBusiness';

export class StudentController implements IBaseController {
  public router: Router;
  private _currentBusinnes: StudentBusiness

  constructor() {
    this._currentBusinnes = new StudentBusiness();
    this.router = Router();
    this.routes();
  }

  listAll = (req: Request, res: Response) => {
    return this._currentBusinnes.listAll()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(error));
  }

  listByID = (req: Request, res: Response) => {
    return this._currentBusinnes.listByID(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error));
  }

  insert(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  update(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  delete(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  routes() {
    this.router.get('/', this.listAll);
    this.router.get('/:id', this.listByID);
  }

}
