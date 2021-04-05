import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '@root/app.module'
import * as express from 'express'
import { SeederModule } from '@database/seeds/seeder.module'

let app: INestApplication

export const initServerApp = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule, SeederModule]
  }).compile()

  app = moduleFixture.createNestApplication()
  app.use(express.json())
  return app
}

export const stopServerApp = async () => {
  await app.close()
}
