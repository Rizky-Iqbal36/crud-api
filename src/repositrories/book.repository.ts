import { EntityRepository, Repository } from 'typeorm'
import { BookModel } from '@database/models/book.model'

@EntityRepository(BookModel)
export class BookRepository extends Repository<BookModel> {
  public async getAllBooks() {
    return this.find()
  }
}
