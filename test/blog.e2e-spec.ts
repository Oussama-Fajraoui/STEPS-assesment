import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BlogController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/blogs (POST)', async () => {
    const blog = {
      title: 'Test Blog',
      content: 'This is a test blog content.',
      author: 'Tester',
    };

    return request(app.getHttpServer())
      .post('/blogs')
      .send(blog)
      .expect(HttpStatus.CREATED)
      .expect({
        ...blog,
        upvotes: 0,
        downvotes: 0,
        _id: expect.any(String),
        __v: expect.any(Number),
      });
  });

  it('/blogs (GET)', async () => {
    return request(app.getHttpServer())
      .get('/blogs')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
