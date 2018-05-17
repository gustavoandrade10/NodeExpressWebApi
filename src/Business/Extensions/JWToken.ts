import * as jwt from 'jsonwebtoken';
import { config } from '../../Config/configs';

class JWToken {

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err)
        }

        resolve(decodedToken)
      })
    })
  }

  create(tokenOptions: IJWTokenSignOptions): BaseToken {

    if (!tokenOptions.expiresIn) {
      tokenOptions.expiresIn = 3600 //seconds = 60minutes;
    }

    let tokenString = jwt.sign({
      data: tokenOptions.data
    }, config.secret, {
        expiresIn: tokenOptions.expiresIn,
        algorithm: 'HS256'
      })


    let token = new BaseToken();
    let date = new Date();
    date.setSeconds(Number(tokenOptions.expiresIn))

    token.access_token = tokenString;
    token.expires_in = tokenOptions.expiresIn;
    token.expires = date;

    return token
  }

}

export default new JWToken;


class BaseToken {
  access_token: string;
  //in seconds
  expires_in: string | number;
  // date format
  expires: Date;
}