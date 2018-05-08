import { Response, Params, Controller, Get} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IBaseController } from '../Interfaces/IBaseController';
import { StudentBusiness } from '../../Business/Rules/StudentBusiness';


@Controller('/users')
@Injectable()
export class StudentController implements IBaseController {
  
  currentBusinnes: StudentBusiness;

  constructor() {
    this.currentBusinnes = new StudentBusiness();
  }

  @Get('/')
  ListAll(@Response() res) {
    res.send(this.currentBusinnes.listAll());
  }

  @Get('/:id')
  ListByID(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.listByID(id));
  }


}
