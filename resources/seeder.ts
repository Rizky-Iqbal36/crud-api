import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { SeederModule } from '@database/seeds/seeder.module'
import Seeds from '@database/seeds'
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
        .finally(() => {
          app.close()
        })
    })
    .catch(err => {
      Logger.error(err)
    })
})()
