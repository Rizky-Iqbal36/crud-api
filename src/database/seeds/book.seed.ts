import faker from 'faker'
import { BookRepository } from '@root/repositrories/book.repository'
import { Injectable } from '@nestjs/common'
import { BookStatusEnum } from '@root/interfaces/enum'

@Injectable()
export class SeedBookData {
  constructor(private readonly bookRepository: BookRepository) {}
  async createMany(loop: number) {
    const all = []
    for (let i = 0; i < loop; i++) {
      all.push(await this.createOne())
    }
    return all
  }

  async createOne(categoryId?: string[], bookMarkedBy?: string[]) {
    //, authors?: string[]) {
    const BookStatus = Object.keys(BookStatusEnum).map(val => BookStatusEnum[val])
    return this.bookRepository.createBook({
      isActive: faker.datatype.boolean(),
      status: faker.random.arrayElement(BookStatus),
      title: faker.name.title(),
      isbn: faker.finance.creditCardNumber(),
      authors: [`${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`],
      ...(categoryId ? { categoryIds: categoryId } : {}),
      publication: faker.date.past(10, new Date()),
      pages: faker.datatype.number(),
      uploadBy: '607ea12bd21e76a4433ea592', //temporary, wait for user integration
      views: 0,
      aboutBook: faker.commerce.productDescription(),
      file: `file_${faker.lorem.sentence(1)}epub`,
      thumbnail: faker.image.animals(),
      bookMarked: 0,
      ...(bookMarkedBy ? { bookMarkedBy: bookMarkedBy } : {})
    })
  }
}
