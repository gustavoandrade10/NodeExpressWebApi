import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { IBaseController } from '../Interfaces/IBaseController';
import { ExampleProject } from '../../Models/ExampleProject';
import { ExampleProjectBusiness } from '../../Business/Rules/ExampleProjectBusiness';

@Controller('/projects')
@Injectable()
export class ExampleProjectController implements IBaseController<ExampleProject> {

  currentBusinnes: ExampleProjectBusiness;

  constructor() {
    this.currentBusinnes = new ExampleProjectBusiness();
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
