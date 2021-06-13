import { Module } from '@nestjs/common'
import { controllers } from '@root/controllers/index'
import { databaseProviders } from '@database/index'
import { repositories } from '@root/repositrories/index'

@Module({
  controllers,
  providers: [...databaseProviders, ...repositories]
})
export class AppModule {}
