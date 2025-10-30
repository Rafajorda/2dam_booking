
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, HttpException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
       transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Mi API con NestJS')
    .setDescription('Documentación generada automáticamente con Swagger')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
