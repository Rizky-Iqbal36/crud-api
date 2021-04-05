import faker from 'faker'
import { BookRepository } from '@root/repositrories/book.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BookDataSeed {
  constructor(private readonly bookRepository: BookRepository) {}

  async createMany(loop: number) {
    await this.bookRepository.delete({})
    const all = []
    for (let i = 0; i < loop; i++) {
      all.push(await this.createOne())
    }
    return all
  }

  async createOne() {
    return this.bookRepository.save({
      isActive: faker.datatype.boolean(),
      title: faker.name.title(),
      ISBN: faker.finance.creditCardNumber(),
      author: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
      publication: faker.date.recent(),
      pages: faker.datatype.number(),
      uploadBy: faker.datatype.number(),
      aboutBook: faker.commerce.productDescription()
    })
  }
}
