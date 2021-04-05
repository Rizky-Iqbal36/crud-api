import { config } from 'dotenv'
import * as pjson from '../../../package.json'
config()

const appConfig = {
  app: {
    name: pjson.name,
    version: pjson.version
  },
  database: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? `${process.env.DATABASE_NAME}_test` : process.env.DATABASE_NAME,
    autoLoadModels: true,
    synchronize: true // set true to sync based on models,
  }
}

export default appConfig
