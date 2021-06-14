import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { initServerApp, stopServerApp, flushMongoDB } from '@root/__test__/utils/createApp'
import { SeedUserData } from '@database/seeds/user.seed'
import { validHeaders } from '@root/__test__/utils/set-header'
import { UserRepository } from '@root/repositories/user.repository'

const header: any = validHeaders
const url = '/admin'

describe(`Admin API`, () => {
  let app: INestApplication
  let server: any
  let seedUserData: SeedUserData

  let userRepository: UserRepository

  beforeAll(async () => {
    app = await initServerApp()
    server = app.getHttpServer()
    seedUserData = await app.get(SeedUserData)

    userRepository = await app.get(UserRepository)

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

  it(`Success => Should delete a user`, async () => {
    const user = await seedUserData.createOne({ admin: false })

    let getUsers = await userRepository.getAllUsers()
    expect(getUsers.length).toBe(1)
    expect(user).toMatchObject({
      userId: getUsers[0]._id,
      email: getUsers[0].email
    })

    const admin = await seedUserData.createOne({ admin: true })

    header['x-user-id'] = admin.userId
    header['Authorization'] = `Bearer ${admin.token}`
    const res = await request(server).delete(`${url}/${user.userId}`).set(header).send()
    expect(res.status).toBe(200)

    getUsers = await userRepository.getAllUsers()
    expect(getUsers.length).toBe(1)
    expect(admin).toMatchObject({
      userId: getUsers[0]._id,
      email: getUsers[0].email
    })
  })

  it(`Error => Should got error: user can't access Admin API`, async () => {
    const user = await seedUserData.createOne({ admin: false })

    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`
    const res = await request(server).get(`${url}/get-users`).set(header).send()
    expect(res.status).toBe(401)
    expect(res.body.errors.flag).toBe('USER_UNAUTHORIZED')
  })

  it(`Error => Delete a user should got error: Invalid param`, async () => {
    const admin = await seedUserData.createOne({ admin: true })

    header['x-user-id'] = admin.userId
    header['Authorization'] = `Bearer ${admin.token}`
    const res = await request(server).delete(`${url}/123`).set(header).send()
    expect(res.status).toBe(400)
    expect(res.body.errors.message).toBe('INVALID_PARAM')
  })

  it(`Error => Delete a user should got error: No such a user`, async () => {
    const admin = await seedUserData.createOne({ admin: true })

    header['x-user-id'] = admin.userId
    header['Authorization'] = `Bearer ${admin.token}`
    const res = await request(server).delete(`${url}/607ea12bd21e76a4433ea592`).set(header).send()
    expect(res.status).toBe(404)
    expect(res.body.errors.message).toBe('USER_NOT_FOUND')
  })
})
