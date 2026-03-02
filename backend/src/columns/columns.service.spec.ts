import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsService } from './columns.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';

describe('ColumnsService', () => {
  let service: ColumnsService;

  beforeEach(async () => {
    /**
     * Configura o módulo de testes com o ColumnsService e um mock do repositório.
     * O repositório mockado implementa os métodos: find, findOne, save e delete.
     */
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColumnsService,
        {
          provide: getRepositoryToken(ColumnEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ColumnsService>(ColumnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
