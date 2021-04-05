import { TypeOrmModule } from '@nestjs/typeorm'
import { BookModel } from '@database/models/book.model'
import appConfig from '@app/config/appConfig'

const databaseConfig = appConfig.database
export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: databaseConfig.synchronize,
  autoLoadEntities: databaseConfig.autoLoadModels,
  entities: [BookModel]
})
