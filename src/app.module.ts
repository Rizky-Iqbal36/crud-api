import { Module } from '@nestjs/common'
import { controllers } from '@root/controllers/index'
import database from '@database/index'
import { repositories } from '@root/repositrories/index'

@Module({
  imports: [database, repositories],
  controllers,
  providers: []
})
export class AppModule {}
