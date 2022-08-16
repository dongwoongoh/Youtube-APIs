import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('SERVER_PORT');
  await app.listen(port, () => console.log(`START SERVER PORT: ${port}`));
}
bootstrap().then();
