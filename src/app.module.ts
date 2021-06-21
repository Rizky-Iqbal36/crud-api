import { Module, MiddlewareConsumer } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { controllers } from '@root/controllers/index'
import { UserController } from '@root/controllers/api/user.controller'
import { AdminController } from '@root/controllers/api/admin.controller'

import { databaseProviders } from '@database/index'
import { repositories } from '@root/repositories'
import { services } from '@root/services'

import { UserAuthMiddleware } from '@root/authentication/middleware/auth.middleware'

import { HttpExceptionFilter } from '@root/app/exception/http-exception.filter'
import ResponseInterceptor from '@root/app/utils/interceptor/response.interceptor'
@Module({
  controllers,
  providers: [
    ...databaseProviders,
    ...repositories,
    ...services,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
  ]
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(UserController, AdminController)
  }
}
