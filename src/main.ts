import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  // TODO: Optionally you can add a global prefix
  /*
   app.setGlobalPrefix('api');
   */
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
await bootstrap();
