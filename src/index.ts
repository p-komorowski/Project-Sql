import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { config, entities } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    })
  );
  createConnection({
    name: "new",
    type: "postgres",
    host: config.database.host,
    port: 5432,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: entities,
    synchronize: true,
  })
    .then((connection) => {
      connection.runMigrations();
    })
    .catch((error) => console.log(error));
  await app.listen(3000);
}
bootstrap();
