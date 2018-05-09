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
