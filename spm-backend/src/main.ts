import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow Frontend (localhost:3000) to access Backend

  // Enable Validation for DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('SPM Portal API')
    .setDescription('The SPM Partner & Admin Backend API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Backend runs on 4001 to avoid conflict
  await app.listen(4001);
  console.log('Application is running on: http://localhost:4001/api');
}
bootstrap();
