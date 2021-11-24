import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { config, entities } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swagger = new DocumentBuilder()
    .setTitle('Project-sql')
    .setDescription('The Project-sql API description')
    .setVersion('1.0')
    .addTag('Endpoints')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );
  createConnection({
    name: 'new',
    type: 'mysql',
    host: 'config.database.host',
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: entities,
    synchronize: false,
  })
    .then((connection) => {
      connection.runMigrations();
    })
    .catch((error) => console.log(error));
  await app.listen(3000);
}
bootstrap();
