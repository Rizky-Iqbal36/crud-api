import { NestFactory } from '@nestjs/core'
import ResponseInterceptor from '@root/app/utils/interceptor/response.interceptor'
import { AppModule } from './app.module'
import config from '@root/app/config/appConfig'

async function bootstrap() {
  const port = config.app.port
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(port, () => `App is running on port ${port}`)
}
bootstrap()
