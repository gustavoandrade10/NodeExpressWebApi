import * as jwt from 'jsonwebtoken';
import { config } from '../configs';
import * as _ from 'lodash';

class JWToken {

  verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err)
        }

        resolve(decodedToken)
      })
    })
  }

  createJWToken(tokenOptions: IJWTokenSignOptions) {

    if (!tokenOptions.expiresIn) {
      tokenOptions.expiresIn = 3600 //seconds = 60minutes;
    }

    let token = jwt.sign({
      data: tokenOptions.data
    }, config.secret, {
        expiresIn: tokenOptions.expiresIn,
        algorithm: 'HS256'
      })

    return token
  }

}

export default new JWToken;