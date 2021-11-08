import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Customer } from 'src/modules/user/entities';
import { getNamespace } from 'cls-hooked';
import { v4 as uuid } from 'uuid';

export class RequestContextProvider {
    constructor(req: Request, res: Response) {
        this.res = res;
        this.req = req;
    }
    public static uuid = uuid();
    req: Request;
    res: Response;

    public static currentRequestContextProvider(): RequestContextProvider {
        const session = getNamespace(RequestContextProvider.uuid);
        if (session && session.active) {
            return session.get(RequestContextProvider.name);
        }
        return null;
    }

    public static currentUser(): Customer {
        const currentUser: Customer =
            RequestContextProvider.currentRequestContextProvider().req['User'];
        if (!currentUser) {
            throw new UnauthorizedException('user not found');
        } else {
            return currentUser;
        }
    }
}
