import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  const conf = new DocumentBuilder()
    .setTitle('review')
    .build();
  const doc = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('api', app, doc);
  await app.listen(3000);
  console.log('http://localhost:3000/api');
}
bootstrap();
