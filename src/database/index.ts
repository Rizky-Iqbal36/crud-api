import mongoose from 'mongoose'
import config from '@root/app/config/appConfig'

const dbName = process.env.APP_ENV === 'local' ? `${config.mongodb.db}_test` : config.mongodb.db

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      mongoose.connect(`${config.mongodb.uri()}/${dbName}?retryWrites=true`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: config.mongodb.user,
        pass: config.mongodb.pass,
        authSource: config.mongodb.authSource,
        useFindAndModify: false,
        useCreateIndex: true
      })
  }
]
