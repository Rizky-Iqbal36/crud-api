import { Injectable } from '@nestjs/common'
import { SeedBookData } from '@database/seeds/book.seed'

export const seedFiles = [SeedBookData]

@Injectable()
export default class Seeds {
  constructor(private readonly bookDataSeed: SeedBookData) {}

  async exec() {
    await this.registerSeeder()
  }

  private async registerSeeder() {
    await this.bookDataSeed.createMany(10)
  }
}
