import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';

// Define os testes do ColumnsController
describe('ColumnsController', () => {
  let controller: ColumnsController;

  // Configuração antes de cada teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumnsController],
      providers: [
        {
          provide: ColumnsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ColumnsController>(ColumnsController);
  });

  // Testa se o controller está definido
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
