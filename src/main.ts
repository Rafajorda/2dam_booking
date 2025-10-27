// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
// }
// bootstrap();


import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, HttpException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters({
  //   catch(exception: unknown) {
  //     if (exception instanceof HttpException) {
  //       Logger.error('HttpException thrown', exception.getResponse());
  //     } else {
  //       Logger.error('Unknown exception thrown', exception);
  //     }
  //   },
  // });
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
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
