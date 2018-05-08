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
    res.send(this.currentBusinnes.ListAll());
  }

  @Get('/:id')
  ListByID(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.ListByID(id));
  }

  @Post('/')
  Insert(@Response() res, @Body() model: UsuarioPortal) {
    res.send(this.currentBusinnes.Insert(model));
  }

  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: UsuarioPortal) {
    res.send(this.currentBusinnes.Update(id, model));
  }

  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.Delete(id));
  }

}
