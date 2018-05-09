import { Middleware } from '@decorators/express';
import { Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { config } from '../../config/configs';
import { Request } from 'express-serve-static-core';
import JWToken from '../../Config/JsonWebToken/JWToken';

/**
 * @description If Authorize then check request.user for user data, data you pass
 * when creating token
 */
export class Authorize implements Middleware {
  public use(request, response: Response, next: NextFunction): void {
    var token = request.headers['x-access-token'] || request.headers['authorization'];

    JWToken.verifyJWTToken(token)
    .then((decodedToken: any) =>
    {
      request.user = decodedToken.data
      next()
    })
    .catch((err) =>
    {
        response.status(401)
        .json({message: "Authorization has been denied for this request."})
    })
  }
}
