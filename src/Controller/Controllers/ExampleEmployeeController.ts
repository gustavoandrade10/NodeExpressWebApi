import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IBaseController } from '../Interfaces/IBaseController';
import { ExampleEmployeeBusiness } from '../../Business/Rules/ExampleEmployeeBusiness';
import { ExampleEmployee } from '../../Models/Database/ExampleEmployee';
import { ExampleEmployeeRepository } from '../../Repository/Respositories/ExampleEmployeeRepository';
import { BusinessFactory } from '../../Business/Factories/BusinessFactory';
import { IExampleEmployeeBusiness } from '../../Business/Interfaces/IExampleEmployeeBusiness';

@Controller('/employees')
@Injectable()
export class ExampleEmployeeController implements IBaseController<ExampleEmployee> {

  private businessFactory: BusinessFactory;
  private currentBusinnes: IExampleEmployeeBusiness;

  constructor() {
    this.businessFactory =  new BusinessFactory();
    this.currentBusinnes = this.businessFactory.GetExampleEmployeeBusiness();
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
