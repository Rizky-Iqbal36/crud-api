import { Injectable } from '@nestjs/common'
import { SeedUserData } from '@database/seeds/user.seed'

export const seedFiles = [SeedUserData]

@Injectable()
export default class Seeds {
  constructor(private readonly seedUserData: SeedUserData) {}

  async exec() {
    await this.registerSeeder()
  }

  private async registerSeeder() {
    await this.seedUserData.createMany(10)
  }
}
