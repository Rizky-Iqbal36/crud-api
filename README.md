<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">This project was built using <a href="https://nestjs.com/" target="_blank">Nest.js</a>, a <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications. under the hood nestjs is using expressjs</p>

## Description

This project is using [this](https://github.com/Rizky-Iqbal36/NestJs-boilerplate/tree/refactor/mongodb) project as boilerplate

## Installation

```bash
# install dependencies
$ npm install

# get env variable

$ cp .env.example .env

# start service
$ npm run dependency:local
```

## Endpoint List

| Methode |      Endpoint       |        API |
| ------- | :-----------------: | ---------: |
| GET     |       /health       | Health API |
| POST    |   /auth/register    |   Auth API |
| POST    |     /auth/login     |   Auth API |
| GET     |  /admin/get-users   |  Admin API |
| GET     | /admin/get-user/:id |  Admin API |
| DELETE  |     /admin/:id      |  Admin API |
| PATCH   |     /admin/:id      |  Admin API |
| GET     |      /user/:id      |   User Api |
| PATCH   | /user/change-pw/:id |   User APi |

## Running the app

Note: Finish Installation first

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

Note: Finish Installation first

```bash
# unit tests
$ npm run test
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Rizky Iqbal](mailto:rizkiiqbal36@gmail.com)
- Website - [https://rizky-iqbal.netlify.app](https://rizky-iqbal.netlify.app)
- Instagram - [@rizky_iqbal48](https://www.instagram.com/rizky_iqbal48)
- Twitter - [@rizkyiqbal36](https://www.twitter.com/rizkyiqbal36)
- Github - [Rizky-Iqbal36](https://github.com/Rizky-Iqbal36)
- Gitlab - [rizkyiqbal36](https://gitlab.com/rizkyiqbal36)

## License

This project is [MIT licensed](LICENSE).
