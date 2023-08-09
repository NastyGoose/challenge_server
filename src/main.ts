import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/userInfo.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // TODO: Change with respect to real origin
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true
  })

  await app.listen(process.env.PORT || 3000, '0.0.0.0')
}

void bootstrap()
