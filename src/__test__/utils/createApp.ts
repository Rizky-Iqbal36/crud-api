import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '@root/app.module'
import { SeederModule } from '@database/seeds/seeder.module'
import mongoose from 'mongoose'

let app: INestApplication

export const initServerApp = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule, SeederModule]
  }).compile()

  app = moduleFixture.createNestApplication()
  return app
}

export const stopServerApp = async () => {
  await app.close()
  await closeMongoDB()
}

export const flushMongoDB = async () => {
  const models = Object.values(mongoose.models)
  for (const model of models) {
    await model.deleteMany({})
  }
}

export const dropMongoDB = async () => {
  await mongoose.connection.db.dropDatabase()
}

export const closeMongoDB = mongoose.disconnect
