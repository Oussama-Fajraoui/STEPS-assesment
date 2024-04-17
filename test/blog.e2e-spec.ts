import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BlogController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    authToken = 'tezgzehgzerhezh';
  });

  it('/blogs (POST)', async () => {
    const blog = {
      title: 'Test Blog',
      content: 'This is a test blog content.',
      author: 'Tester',
    };

    return request(app.getHttpServer())
      .post('/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(blog)
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body).toMatchObject({
          title: blog.title,
          content: blog.content,
          author: blog.author,
          upvotes: 0,
          downvotes: 0
        });
        expect(res.body._id).toBeDefined();
        expect(res.body.__v).toBeDefined();
      });
  });

  it('/blogs (GET)', async () => {
    return request(app.getHttpServer())
      .get('/blogs')
      .set('Authorization', `Bearer ${authToken}`)
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
