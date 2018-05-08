import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IBaseController } from '../Interfaces/IBaseController';
import { ExampleEmployeeBusiness } from '../../Business/Rules/ExampleEmployeeBusiness';
import { ExampleEmployee } from '../../Models/ExampleEmployee';

@Controller('/employees')
@Injectable()
export class ExampleEmployeeController implements IBaseController<ExampleEmployee> {

  currentBusinnes: ExampleEmployeeBusiness;

  constructor() {
    this.currentBusinnes = new ExampleEmployeeBusiness();
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
  Insert(@Response() res, @Body() model: ExampleEmployee) {
    res.send(this.currentBusinnes.Insert(model));
  }

  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: ExampleEmployee) {
    res.send(this.currentBusinnes.Update(id, model));
  }

  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.Delete(id));
  }

}
