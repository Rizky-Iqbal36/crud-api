import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { SeederModule } from '@database/seeds/seeder.module'
import Seeds from '@database/seeds'
import { closeMongoDB } from '@root/__test__/utils/createApp'
;(async function () {
  Logger.debug('Processing your Seeder')
  await NestFactory.createApplicationContext(SeederModule)
    .then(async app => {
      const seeder = app.get(Seeds)
      await seeder
        .exec()
        .then(() => {
          Logger.debug('Seeding Completed 🚀 ')
        })
        .finally(async () => {
          app.close()
          await closeMongoDB()
          return false
        })
    })
    .catch(err => {
      Logger.error(err)
    })
  return false
})()
