import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { initServerApp, stopServerApp, flushMongoDB } from '@root/__test__/utils/createApp'
import { SeedUserData } from '@database/seeds/user.seed'
import { validHeaders } from '@root/__test__/utils/set-header'

const header: any = validHeaders
const url = '/admin'

describe(`Admin API`, () => {
  let app: INestApplication
  let server: any
  let seedUserData: SeedUserData

  beforeAll(async () => {
    app = await initServerApp()
    server = app.getHttpServer()
    seedUserData = await app.get(SeedUserData)

    await app.init()
  })

  beforeEach(async () => {
    await flushMongoDB()
  })

  afterAll(async () => {
    await stopServerApp()
  })

  it(`Success => Should get many user`, async () => {
    const admin = await seedUserData.createOne({ admin: true })
    await seedUserData.createMany(14)

    header['x-user-id'] = admin.userId
    header['Authorization'] = `Bearer ${admin.token}`
    const res = await request(server).get(`${url}/get-users`).set(header).send()

    expect(res.status).toBe(200)
    expect(res.body.result.length).toBe(15)
  })

  it(`Error => Should got error: user can't access Admin API`, async () => {
    const user = await seedUserData.createOne({ admin: false })

    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`
    const res = await request(server).get(`${url}/get-users`).set(header).send()
    expect(res.status).toBe(401)
    expect(res.body.errors.flag).toBe('USER_UNAUTHORIZED')
  })
})
