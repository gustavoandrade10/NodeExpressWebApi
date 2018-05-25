import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { ExampleEmployee } from '../../Models/Database/ExampleEmployee';
import { BusinessFactory } from '../../Business/Factories/BusinessFactory';
import { IExampleEmployeeBusiness } from '../../Business/Interfaces/IExampleEmployeeBusiness';
import { Authorize } from '../Middlewares/Authorize';

@Controller('/employees',[Authorize])
export class ExampleEmployeeController{

  private businessFactory: BusinessFactory;
  private currentBusinnes: IExampleEmployeeBusiness;

  constructor() {
    this.businessFactory =  new BusinessFactory();
    this.currentBusinnes = this.businessFactory.GetExampleEmployeeBusiness();
  }

  // @description List all employees
  @Get('/')
  ListAll(@Response() res) {
    res.send(this.currentBusinnes.ListAll());
  }

  // @description Get employee by id
  @Get('/:id')
  ListByID(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.ListByID(id));
  }

  // @description Create new employee
  @Post('/')
  Insert(@Response() res, @Body() model: ExampleEmployee) {
    res.send(this.currentBusinnes.Insert(model));
  }

  // @description Update employee by id
  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: ExampleEmployee) {
    res.send(this.currentBusinnes.Update(id, model));
  }

  // @description Delete employee by id
  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.Delete(id));
  }

}
