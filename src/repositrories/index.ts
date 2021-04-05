import { TypeOrmModule } from '@nestjs/typeorm'
import { BookRepository } from '@root/repositrories/book.repository'

export const repositories = TypeOrmModule.forFeature([BookRepository])
