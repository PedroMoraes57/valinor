import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  // Instância da aplicação NestJS para testes e2e
  let app: INestApplication;

  // Hook executado antes de todos os testes
  beforeAll(async () => {
    // Cria o módulo de teste com as importações necessárias
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Instancia a aplicação NestJS e a inicializa
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET / - aplicação sobe', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
