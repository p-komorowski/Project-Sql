import { createParamDecorator, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import jwt_decode from "jwt-decode";

@Injectable()
export class RequestContextProvider {
    get(key) {
        return httpContext.get(key)
    }

    set(key, value) {
        return httpContext.set(key, value)
    }
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(private requestContextProvider: RequestContextProvider) { }

    use(req: Request, res: Response, next: NextFunction) {

        // first run express-http-context middleware
        httpContext.middleware(req, res, () => {
            // set context data
            // for example extract user data from JWT
            const [, token] = req.headers.authorization.split(' ')
            const decoded: Record<string, unknown> = jwt_decode(token)
            this.requestContextProvider.set('userId', decoded.userId)
            next();
        })
    }
}