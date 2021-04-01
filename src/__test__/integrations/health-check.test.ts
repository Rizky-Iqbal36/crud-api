import { INestApplication } from '@nestjs/common';
import { initServerApp, stopServerApp } from '@root/__test__/utils/createApp';
import request from 'supertest';

describe('check if the server is running or not', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    app = await initServerApp();
    server = app.getHttpServer();
    await app.init();
  });

  afterAll(async () => await stopServerApp());

  it('should hit health check endpoint', async () => {
    const res = await request(server).get('/health');
    expect(res.status).toBe(200);
  });
});
