import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { ExampleProject } from '../../Models/Database/ExampleProject';
import { IExampleProjectBusiness } from '../../Business/Interfaces/IExampleProjectBusiness';
import { BusinessFactory } from '../../Business/Factories/BusinessFactory';

@Controller('/projects')
@Injectable()
export class ExampleProjectController{

  private businessFactory: BusinessFactory;
  private currentBusinnes: IExampleProjectBusiness;

  constructor() {
    this.businessFactory = new BusinessFactory();
    this.currentBusinnes = this.businessFactory.GetExampleProjectBusiness();
  }

  @Get('/')
  ListAll(@Response() res) {
    res.send(this.currentBusinnes.ListAll());
  }

  @Get('/managers')
  ListAllProjectsWithManager(@Response() res) {
    res.send(this.currentBusinnes.ListAllProjectsWithManager());
  }

  @Get('/:id')
  ListByID(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.ListByID(id));
  }

  @Post('/')
  Insert(@Response() res, @Body() model: ExampleProject) {
    res.send(this.currentBusinnes.Insert(model));
  }

  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: ExampleProject) {
    res.send(this.currentBusinnes.Update(id, model));
  }

  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.Delete(id));
  }

}
