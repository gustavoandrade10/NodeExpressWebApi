import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { ExampleProject } from '../../Models/Database/ExampleProject';
import { IExampleProjectBusiness } from '../../Business/Interfaces/IExampleProjectBusiness';
import { BusinessFactory } from '../../Business/Factories/BusinessFactory';

@Controller('/projects')
export class ExampleProjectController{

  private businessFactory: BusinessFactory;
  private currentBusinnes: IExampleProjectBusiness;

  constructor() {
    this.businessFactory = new BusinessFactory();
    this.currentBusinnes = this.businessFactory.GetExampleProjectBusiness();
  }

  // @description List all projects
  @Get('/')
  ListAll(@Response() res) {
    res.send(this.currentBusinnes.ListAll());
  }

  // @description List all projects with managers
  @Get('/managers')
  ListAllProjectsWithManager(@Response() res) {
    res.send(this.currentBusinnes.ListAllProjectsWithManager());
  }

  // @description Get project by id
  @Get('/:id')
  ListByID(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.ListByID(id));
  }

  // @description Create new project
  @Post('/')
  Insert(@Response() res, @Body() model: ExampleProject) {
    res.send(this.currentBusinnes.Insert(model));
  }

  // @description Update project by id
  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: ExampleProject) {
    res.send(this.currentBusinnes.Update(id, model));
  }

  // @description Delete project by id
  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send(this.currentBusinnes.Delete(id));
  }

}
