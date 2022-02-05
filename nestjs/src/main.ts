import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './common/config';

async function bootstrap() {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(AppModule, {
      bufferLogs: true,
    });

  const configSwagger = new DocumentBuilder()
    .setTitle('Trello')
    .setDescription('Trello new')
    .setVersion('1.0')
    .addTag('trello')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(config.PORT, '0.0.0.0', () =>
    console.log(`Server listen on port ${config.PORT}`),
  );
}
bootstrap();
