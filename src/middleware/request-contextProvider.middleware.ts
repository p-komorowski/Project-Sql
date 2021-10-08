import { NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { Token } from "../modules/auth/entity/token.entity";
import { getManager } from "typeorm";
import { getNamespace, createNamespace } from "cls-hooked";
import { RequestContextProvider } from "./request-context.middleware";

export class RequestContextMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    let tokenHeader: string;
    if (req.headers["authorization"]) {
      tokenHeader = req.headers["authorization"].replace("Bearer ", "");
    }
    const token = await getManager().findOne(Token, {
      join: {
        alias: "token",
        leftJoinAndSelect: {
          user: "token.user",
        }
      },
      where: { token: tokenHeader },
    });

    req["User"] = token.user;
    const requestContext = new RequestContextProvider(req, res);
    const session =
      getNamespace(RequestContextProvider.uuid) ||
      createNamespace(RequestContextProvider.uuid);
    session.run(async () => {
      session.set(RequestContextProvider.name, requestContext);
      next();
    });
  }
}
