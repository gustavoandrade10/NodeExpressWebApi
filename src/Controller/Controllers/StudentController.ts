import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IBaseController } from '../Interfaces/IBaseController';
import { StudentBusiness } from '../../Business/Rules/StudentBusiness';
import { UsuarioPortal } from '../../Models/UsuarioPortal';

@Controller('/users')
@Injectable()
export class StudentController implements IBaseController<UsuarioPortal> {

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

  @Post('/')
  Insert(@Response() res, @Body() model: UsuarioPortal) {
    res.send(this.currentBusinnes.insert(model));
  }

  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: UsuarioPortal) {
    res.send(this.currentBusinnes.update(id, model));
  }

  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.delete(id));
  }

}
