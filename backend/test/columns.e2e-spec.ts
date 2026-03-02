import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Columns (e2e)', () => {
  let app: INestApplication;
  let columnId: number;

  // Inicializa a aplicação NestJS antes dos testes
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Testa criação de coluna
  it('POST /columns - cria column', async () => {
    const response = await request(app.getHttpServer())
      .post('/columns')
      .send({ name: 'To Do' })
      .expect(201);

    expect(response.body.name).toBe('To Do');
    columnId = response.body.id;
  });

  // Testa listagem de colunas
  it('GET /columns - lista columns', async () => {
    const response = await request(app.getHttpServer())
      .get('/columns')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  // Testa atualização de coluna
  it('PATCH /columns/:id - atualiza column', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/columns/${columnId}`)
      .send({ name: 'Doing' })
      .expect(200);

    expect(response.body.name).toBe('Doing');
  });

  // Testa exclusão de coluna
  it('DELETE /columns/:id - remove column', async () => {
    await request(app.getHttpServer())
      .delete(`/columns/${columnId}`)
      .expect(200);
  });

  // Fecha a aplicação após os testes
  afterAll(async () => {
    await app.close();
  });
});
