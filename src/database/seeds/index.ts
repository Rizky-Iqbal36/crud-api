import { Injectable } from '@nestjs/common'
import { Connection } from 'typeorm'
import { BookDataSeed } from '@database/seeds/book.seed'

export const seedFiles = [BookDataSeed]

@Injectable()
export default class Seeds {
  constructor(private readonly connection: Connection, private readonly bookDataSeed: BookDataSeed) {}

  async exec() {
    await this.registerSeeder()
  }

  private async registerSeeder() {
    await this.bookDataSeed.createMany(10)
  }
}
