import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Token } from "../modules/auth/entity/token.entity";
import { User } from "src/modules/user/entities";
import { getManager } from "typeorm";
var cls = require('cls-hooked').createNamespace;
import { v4 as uuid } from "uuid";

export class RequestContextProvider {
  constructor(req:Request, res:Response) {
  }
  public static uuid = uuid()
  req:Request
  res:Response


  public static currentRequestContextProvider(): RequestContextProvider {
    const session = cls.getNamespace(RequestContextProvider.uuid);
    if (session && session.active) {
      return session.get(RequestContextProvider.name);
    }
    return null;
  }

  public static currentUser(user): User {
    return user;
  }
}

export class RequestContextMiddleware implements NestMiddleware {
  constructor(private requestContextProvider: RequestContextProvider) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let tokenHeader: string;
    if (req.headers["authorization"]) {
      tokenHeader = req.headers["authorization"].replace("Bearer ", "");
    }
    const token = await getManager().findOne(Token, {});
    req["user"] = token.user;
    const requestContext = new RequestContextProvider(req,res);
    const session =
      cls.getNamespace(RequestContextProvider.uuid) ||
      cls.createNamespace(RequestContextProvider.uuid);
    session.run(async () => {
      session.set(RequestContextProvider.name, requestContext);
      next();
    });
  }
}
