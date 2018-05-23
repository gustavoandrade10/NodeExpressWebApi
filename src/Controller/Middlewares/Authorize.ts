import { Middleware } from '@decorators/express';
import { Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { config } from '../../config/configs';
import { Request } from 'express-serve-static-core';
import { Injectable } from '@decorators/di';
import JWToken from '../../Business/Extensions/JWToken';

/**
 * @description If user is authorize then he´s decoded data will be in
 * request.currentUser
 */
@Injectable()
export class Authorize implements Middleware {
  public use(request, response: Response, next: NextFunction): void {
    var token = request.headers['x-access-token'] || request.headers['Authorization'];

    JWToken.verify(token)
    .then((decodedToken: any) =>
    {
      request.currentUser = decodedToken.data
      next();
    })
    .catch((err) =>
    {
        response.status(401)
        .json({message: "Authorization has been denied for this request."})
    })
  }
}
