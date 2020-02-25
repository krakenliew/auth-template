import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/*
  please change config the config folder,entity name,jwt const name to your own variable reading
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000,'0.0.0.0');
}
bootstrap();
