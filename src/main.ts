import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
/*
  please change config the config folder,entity name,jwt const name to your own variable reading
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const server = config.get('server')
  const logger = new Logger('App module')
  const option = new DocumentBuilder()
  .setTitle("Template")
  .setDescription("Is a template of auth")
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app,option)
  SwaggerModule.setup('api',app,document)
  app.useStaticAssets(join(__dirname,'..','public'));
  const port = process.env.PORT || server.port
  await app.listen(port,'0.0.0.0');
  logger.log(`Application start on port ${port}`)
}
bootstrap();
