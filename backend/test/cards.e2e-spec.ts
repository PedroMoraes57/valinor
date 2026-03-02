import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

// Testes e2e para Cards
describe('Cards (e2e)', () => {
  let app: INestApplication;
  let columnId: number;
  let cardId: number;

  // Inicializa a aplicação NestJS
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Cria uma coluna para o card
  it('POST /columns - cria column para o card', async () => {
    const response = await request(app.getHttpServer())
      .post('/columns')
      .send({ name: 'Backlog' })
      .expect(201);

    columnId = response.body.id;
  });

  // Cria um card
  it('POST /cards - cria card', async () => {
    const response = await request(app.getHttpServer())
      .post('/cards')
      .send({
        title: 'Implementar login',
        columnId: columnId,
      })
      .expect(201);

    expect(response.body.title).toBe('Implementar login');
    cardId = response.body.id;
  });

  // Lista todos os cards
  it('GET /cards - lista cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  // Atualiza um card
  it('PATCH /cards/:id - atualiza card', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/cards/${cardId}`)
      .send({ title: 'Implementar login JWT' })
      .expect(200);

    expect(response.body.title).toBe('Implementar login JWT');
  });

  // Remove um card
  it('DELETE /cards/:id - remove card', async () => {
    await request(app.getHttpServer()).delete(`/cards/${cardId}`).expect(200);
  });

  // Fecha a aplicação após os testes
  afterAll(async () => {
    await app.close();
  });
});
