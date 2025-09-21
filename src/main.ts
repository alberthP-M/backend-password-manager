import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API de Reservas de Espacios Comunitarios')
    .setDescription(
      'Documentación de la API para el Sistema de Reservas de Espacios Comunitarios',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa el token JWT (ej. Bearer eyJhbGciOi...)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000).then(async () => {
    logger.verbose(`Server running on ${await app.getUrl()}`);
    logger.verbose(`Api running on ${await app.getUrl()}` + '/api');
    logger.verbose(`Swagger running on ${(await app.getUrl()) + '/api'}`);
  });
}
void bootstrap();
