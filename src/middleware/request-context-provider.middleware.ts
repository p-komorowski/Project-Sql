import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Token } from '../modules/auth/entity/token.entity';
import { getManager } from 'typeorm';
import { getNamespace, createNamespace } from 'cls-hooked';
import { RequestContextProvider } from './request-context.middleware';
import jwtDecode from 'jwt-decode';
export class RequestContextMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    let tokenHeader: string;
    if (req.headers['authorization']) {
      tokenHeader = req.headers['authorization'].replace('Bearer ', '');
    } else if (req.cookies['access_token']) {
      tokenHeader = req.cookies['access_token'];
    }

    // const decode = jwtDecode(tokenHeader)
    // console.log(decode)

    console.log(tokenHeader)
    
    const origin = req.headers['origin'];
    const token = await getManager().findOne(Token, {
      join: {
        alias: 'token',
        leftJoinAndSelect: {
          user: 'token.user',
        },
      },
      where: { token: tokenHeader },
    });
    if (!token) {
      throw new BadRequestException('cannot find token');
    }
    req['User'] = token.user;
    const requestContext = new RequestContextProvider(req, res);
    const session =
      getNamespace(RequestContextProvider.uuid) ||
      createNamespace(RequestContextProvider.uuid);
    session.run(async () => {
      session.set(RequestContextProvider.name, requestContext);
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }
}
