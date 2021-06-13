import { Module } from '@nestjs/common'
import { databaseProviders } from '@database/index'
import { repositories } from '@root/repositrories/index'
import Seeds, { seedFiles } from '@database/seeds'

@Module({
  providers: [Seeds, ...repositories, ...seedFiles, ...databaseProviders]
})
export class SeederModule {}
