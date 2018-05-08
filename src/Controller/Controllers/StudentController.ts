import { Request, Response, Router } from 'express';
import { IBaseController } from '../Interfaces/IBaseController';
import { StudentBusiness } from '../../Business/Rules/StudentBusiness';

export class StudentController implements IBaseController {
  public router: Router;
  public currentBusinnes: StudentBusiness
  
  constructor() {
    this.currentBusinnes = new StudentBusiness();
    this.router = Router();
    this.routes();
  }

  listAll = (req: Request, res: Response) =>{
     this.currentBusinnes.listAll().then(response => res.json(response));
  }
  
  listByID(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
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
  }

}
