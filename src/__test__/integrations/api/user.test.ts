import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { initServerApp, stopServerApp, flushMongoDB } from '@root/__test__/utils/createApp'
import { SeedUserData } from '@database/seeds/user.seed'
import { validHeaders } from '@root/__test__/utils/set-header'
import { UserRepository } from '@root/repositories/user.repository'
import { UserStatusEnum } from '@root/interfaces/enum'
import faker from 'faker'

const header: any = validHeaders
const url = '/user'

describe(`User API`, () => {
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

  it(`Success => Should get a user`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`

    const res = await request(server).get(`${url}/${user.userId}`).set(header).send()

    expect(res.status).toBe(200)
    expect(res.body.result).toMatchObject({
      _id: user.userId.toString(),
      email: user.email,
      isActive: true,
      isAdmin: false,
      status: 'ACTIVE'
    })
  })

  it(`Success => User should change password and login with that password`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`

    const beforeChange = await userRepository.getOneUser(user.userId)

    const newPassword = faker.internet.password(8)
    await request(app.getHttpServer()).patch(`${url}/change-pw/${user.userId}`).set(header).send({ newPassword })

    const afterChange = await userRepository.getOneUser(user.userId)

    expect(beforeChange.password).not.toBe(afterChange.password)

    const res = await request(server).post(`/auth/login`).send({ email: user.email, password: newPassword })
    expect(res.status).toBe(200)
    expect(res.body.result.message).toBe('Login success')
    expect(res.body.result.data).toHaveProperty('token')
  })

  it(`Error => User access API should got error: Invalid token`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    header['x-user-id'] = user.userId
    header[
      'Authorization'
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGJhNzQ3MzE1YTgwMzA1NGEwZTJiNSIsImlhdCI6MTYxOTc2NTA5MCwiZXhwIjoxNjE5ODUxNDkwfQ.bv9Hwp4IAdLAktBa8BL4TFBpE2yWu5t8lCPKfeCVe0k`

    const res = await request(app.getHttpServer()).get(`${url}/${user.userId}`).set(header).send()
    expect(res.status).toBe(400)
    expect(res.body.errors.message).toBe('INVALID_TOKEN')
  })

  it(`Error => User access API should got error: Invalid token => authorization not set`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    header['x-user-id'] = user.userId

    const res = await request(app.getHttpServer()).get(`${url}/${user.userId}`).set(header).send()
    expect(res.status).toBe(400)
    expect(res.body.errors.message).toBe('INVALID_TOKEN')
  })

  it(`Error => User access API should got error: Forbidden`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    delete header['x-user-id']

    const res = await request(app.getHttpServer()).get(`${url}/${user.userId}`).set(header).send()

    expect(res.status).toBe(403)
    expect(res.body.errors.message).toBe('FORBIDDEN')
  })

  it(`Error => User access API should got error: User not found`, async () => {
    header['x-user-id'] = '60c70da2aedf6b3e713f9557'

    const res = await request(app.getHttpServer()).get(`${url}/60c70d51e1ce983dffbf620e`).set(header).send()

    expect(res.status).toBe(404)
    expect(res.body.errors.message).toBe('USER_NOT_FOUND')
  })

  it(`Error => User access API should got error: User blocked`, async () => {
    const user = await seedUserData.createOne({ admin: false, active: false, userStatus: UserStatusEnum.BLOCKED })
    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`

    const res = await request(app.getHttpServer()).get(`${url}/${user.userId}`).set(header).send()

    expect(res.status).toBe(403)
    expect(res.body.errors.message).toBe('USER_BLOCKED')
  })

  it(`Error => Get user data should got error: User can't see other user's data`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`

    const res = await request(server).get(`${url}/607ea12bd21e76a4433ea592`).set(header).send()
    expect(res.status).toBe(401)
    expect(res.body.errors.flag).toBe('UNAUTHORIZED')
  })

  it(`Error => Get user data should got error: Invalid param`, async () => {
    const user = await seedUserData.createOne({ admin: false })
    header['x-user-id'] = user.userId
    header['Authorization'] = `Bearer ${user.token}`

    const res = await request(server).get(`${url}/123`).set(header).send()
    expect(res.status).toBe(400)
    expect(res.body.errors.message).toBe('INVALID_PARAM')
  })
})
