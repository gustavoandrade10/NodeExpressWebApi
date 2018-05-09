import { Response, Params, Controller, Get, Post, Body, Put, Delete } from '@decorators/express';
import { BusinessFactory } from '../../Business/Factories/BusinessFactory';
import { ExampleUser } from '../../Models/Database/ExampleUser';
import { IExampleUserBusiness } from '../../Business/Interfaces/IExampleUserBusiness';

@Controller('/user')
export class ExampleUserController{

  private businessFactory: BusinessFactory;
  private currentBusinnes: IExampleUserBusiness;

  constructor() {
    this.businessFactory = new BusinessFactory();
    this.currentBusinnes = this.businessFactory.GetExampleUserBusiness();
  }


  @Post('/register')
  Register(@Response() res, @Body() model: ExampleUser) {
    res.send(this.currentBusinnes.Insert(model));
  }

  @Post('/authenticate')
  Authenticate(@Response() res, @Body() model: ExampleUser) {
    res.send(this.currentBusinnes.Authenticate(model));
  }
}
