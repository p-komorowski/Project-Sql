import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );
  await app.listen(3000);
}
bootstrap();
/* createConnection({
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Haslo!234",
  database: "Project2",
  entities: [User, ContactDetails, Books, shoppingBasket, Token],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    
  })
  .catch((error) => console.log(error));
 */