import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('practice')
  await app.listen(port, () => `App is running on port ${port}`)
}
bootstrap()
