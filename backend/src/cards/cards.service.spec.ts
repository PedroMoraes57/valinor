import { TestingModule, Test } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';

describe('CardsService', () => {
  let service: CardsService;

  // Mock do repositório com métodos simulados
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // Configuração do módulo de testes antes de cada teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(CardEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  // Limpa os mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testa a criação de um card
  it('deve criar um card', async () => {
    mockRepository.count.mockResolvedValue(0);
    mockRepository.create.mockReturnValue({
      title: 'Teste',
      description: 'Desc',
      columnId: 1,
    });
    mockRepository.save.mockResolvedValue({ id: 1 });
    mockRepository.findOne.mockResolvedValue({
      id: 1,
      title: 'Teste',
      description: 'Desc',
      columnId: 1,
    });

    const result = await service.create({
      title: 'Teste',
      description: 'Desc',
      columnId: 1,
    });

    expect(result).toHaveProperty('id');
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });

  // Testa se lança erro quando card não existe
  it('deve lançar erro se card não existir', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow();
  });
});
